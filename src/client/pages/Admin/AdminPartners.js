import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { partnersActions } from '../../actions/partnersActions';
import { Redirect } from 'react-router-dom';
import { authServices } from '../../services/auth.services';
import ls from 'local-storage';

const addPartner = partnersActions.addPartner;
const getPartners = partnersActions.getPartners;
const deletePartner = partnersActions.deletePartner;
const editPartner = partnersActions.editPartner;
const toolbarConfig = require('../../utils');
const checkToken = authServices.checkToken;

var RichTextEditor;
if (process.env.BROWSER) { 
  RichTextEditor = require('react-rte').default;
 }

const initialState = {
  post: {
    admin_partners_company: '',
    admin_partners_description: RichTextEditor ? RichTextEditor.createEmptyValue() :"",
    admin_partners_url: '',
    admin_partners_videoName: ''
  },
  postRu: {
    admin_partners_company: '',
    admin_partners_description: RichTextEditor ? RichTextEditor.createEmptyValue() :"",
    admin_partners_videoName: ''
  },
  images: {
    mainImage: {
      src: '',
      alt: '',
      title: ''
    },
    additionalImages: []
  },
  isRu: false,
  isAuthed: true,
  errors: '',
  edditing: false,
  selectedPartner: '',
  successMessage: '',
  admin_partners_mainImage: 'Файл не выбран',
  admin_partners_additionalImages: 'Файлы не выбраны',
  admin_partners_video: 'Файл не выбран',
  hasVideo: true
};

class AdminPartners extends Component {
  constructor(props){
    super(props)
    this.state = initialState
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(!nextProps.partners.isLoading){
      if(!nextProps.partners.error){
        this.setState(initialState)
      }
    }
  }


  componentDidMount(){
    checkToken()
      .catch(err => {
        this.setState({ isAuthed: false })
        return
      })
    this.props.getPartners();
  }

  setError = err => {
    this.setState({
      ...this.state,
      errors: err
    })
  }

  _filterEditorContent = () => {
    let editorData = this.state.post.admin_partners_description.toString('html').trim();
    let filteredData = editorData.replace(/<p>/g,'').replace(/<br>/g,'').replace(/<\/p>/g,'').trim();
    return filteredData.length;
  }

  onEdit = () => {
    const formData = this.appendFormData()
    if(formData){
      const mainImage = this.state.images.mainImage;
      const additionalImages = this.state.images.additionalImages
      if(additionalImages.length > 9999999){
        this.setState({errors: 'Ошибка: Допускается не больше 16 фото'})
        return
      }
      if(additionalImages.length < 6){
        this.setState({errors: 'Ошибка: Допускается не меньше 6 фото'})
        return
      }
      for(let file of additionalImages){
        formData.append('additionalImages', JSON.stringify(file))
      }
      formData.append('mainImage', JSON.stringify(mainImage))
      this.props.editPartner(this.state.selectedPartner, formData);
    } else return
  }

  onEditorChange = admin_partners_description => {
    !this.state.isRu ?
      this.setState({
      ...this.state,
      post:{
        ...this.state.post,
        admin_partners_description
      } 
    })
    : this.setState({
      ...this.state,
      postRu:{
        ...this.state.postRu,
        admin_partners_description
      } 
    });
  }
  onChange = e => {
    !this.state.isRu ? 
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [e.target.id] : e.target.value
      }
    })
    :
    this.setState({
      ...this.state,
      postRu: {
        ...this.state.postRu,
        [e.target.id] : e.target.value
      }
    })
  };

  selectPartner = e => {
    const partner = this.props.partners.partners.filter(partner => partner._id === e.target.value)[0];
    let postRu = {};
    if(partner.hasRu){
      postRu = {
        admin_partners_company: partner.companyRu ? partner.companyRu : '',
        admin_partners_description:RichTextEditor ?  RichTextEditor.createValueFromString(partner.descriptionRu, 'html') :"",
        admin_partners_videoName: partner.videoNameRu ? partner.videoNameRu : ''
      };
    }
    this.setState({
      ...this.state,
      post: {
        admin_partners_company: partner.company,
        admin_partners_description: RichTextEditor ?  RichTextEditor.createValueFromString(partner.descriptionRu, 'html') :"",
        admin_partners_url: partner.url,
        admin_partners_videoName: partner.videoName
      },
      images: {
        mainImage: partner.mainImage,
        additionalImages: partner.additionalImages
      },
      postRu : {
        ...postRu,
        admin_partners_description: partner.hasRu ? ( RichTextEditor ?  RichTextEditor.createValueFromString(partner.descriptionRu, 'html'):"" ): (RichTextEditor ? RichTextEditor.createEmptyValue() :"")
      },
      isRu: false,
      edditing: true,
      selectedPartner: partner._id,
      hasVideo: partner.video ? true : false
    })
  }

  appendFormData = (asFormData = true) => {
    this.setState({
      errors: ''
    })
    const formData = new FormData();
    for(let i in this.state.post){
      if(i !== 'admin_partners_description' && i !== 'admin_partners_videoName'){
        if(this.state.post[i].length < 1){
          this.setState({errors: 'Ошибка: Заполните все поля' })
          return
        }
        const formatedData = i.split('_')[2]
        formData.append(formatedData, this.state.post[i].trim())
      } else if(i === 'admin_partners_videoName'){
        // if(this.state.hasVideo && this.state.post[i] < 1){
        //   this.setState({errors: 'Ошибка: Заполните все поля' })
        //   return
        // } else {
          formData.append('videoNameRu', this.state.postRu[i])
        // }
      }
      else  {
        if(this._filterEditorContent() < 1){
          this.setError('Ошибка: заполните поле "описание"')
        return
      }
        formData.append('description', this.state.post[i].toString('html').trim())
      }
    }
    if(asFormData) return formData
    let data = {};
    formData.forEach((value, key) => data[key] = value );
    return data;
  }

  onSubmitRu = e => {
    e.preventDefault();
    if(ls.get('token') !== null){
      const formData = this.appendRu();
      if(formData){
        this.props.editPartner(this.state.selectedPartner, formData)
      }
      return
    } else {
      this.setState({
        isAuthed: false
      })
    }
  }

  appendRu = () => {
    this.setState({errors: '' })
    const formData = new FormData();
    for(let i in this.state.postRu){
      if(i !== 'admin_partners_description' && i !== 'admin_partners_videoName'){
        if(this.state.postRu[i].length < 1){
          console.log(i)
          this.setState({errors: 'Ошибка: Заполните все поля' })
          return
        }
      const formatedData = i.split('_')[2] + 'Ru'
      formData.append(formatedData, this.state.postRu[i].trim())
    } else if(i === 'admin_partners_videoName'){
        // if(this.state.hasVideo && this.state.postRu[i] < 1){
        //   this.setState({errors: 'Ошибка: Заполните все поля' })
        //   return
        // } else {
          formData.append('videoNameRu', this.state.postRu[i])
        // }
    }
     else {
      if(this._filterEditorContent() < 1){
        
        this.setState({errors: 'Ошибка: Заполните все поля' })
        return
      }
      formData.append('descriptionRu', this.state.postRu[i].toString('html').trim())
    }
  }
  formData.append('hasRu', true)
  this.setState({...this.state, errors: ''})
    return formData
}

  onSubmit = e => {
    e.preventDefault();
    if(ls.get('token') !== null){
      const formData = this.appendFormData();
      if(!formData) return
      const mainImage = this.state.images.mainImage;
      const additionalImages = this.state.images.additionalImages
      if(additionalImages.length > 99999){
        this.setState({errors: 'Ошибка: Допускается не больше 16 фото'})
        return
      }
      if(additionalImages.length < 6){
        this.setState({errors: 'Ошибка: Допускается не меньше 6 фото'})
        return
      }
      // formData.append('additionalImages', additionalImages);
      for(let file of additionalImages){
        formData.append('additionalImages', JSON.stringify(file))
      }
      const video = document.getElementById('admin_partners_video').files[0];
      formData.append('mainImage', JSON.stringify(mainImage))
      formData.append('video', video)
      this.props.addPartner(formData)
    } else {
      this.setState({
        isAuthed: false
      })
    }
  }

  onDelete = () => {
    this.props.deletePartner(this.state.selectedPartner)
  }

  readFile = file => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => {
        res(reader.result)
      }
      reader.readAsDataURL(file);
    })
  }

  showPreview = async (id, multiple) => {
    const file = document.getElementById(id);
    const files = file.files;
    const preview = document.getElementById(id+'_preview')

    if(files[0] && !multiple){
      this.setState({
        images: {
          ...this.state.images,
          mainImage: {
            src: await this.readFile(files[0]),
            alt: '',
            title: ''
          }
        }
      })
    }
    if(multiple){
      Promise.all([...files].map(async file => ({
        src: await this.readFile(file),
        alt: '',
        title: ''
      })
    ))
        .then(res => {
          this.setState({
            images: {
              ...this.state.images,
              additionalImages: res
            }
          })
        })
    }
  }

  onChangeMainImgProps = (e, type) => {
    this.setState({
      images: {
        ...this.state.images,
        mainImage: {
          ...this.state.images.mainImage,
          [type] : e.target.value
        }
      }
    })
  }

  onChangeImgProps = (e, index, type) => {
    this.setState({
      images: {
        ...this.state.images,
        additionalImages: this.state.images.additionalImages.map((file, i) => i === index 
        ? ({ ...file, [type]: e.target.value }) : file)
      }
    })
  }

  getFiles = e => {
    const id = e.target.id;
    const file = document.getElementById(id);
    const multiple = file.multiple;
    this.showPreview(id, multiple)
    const files = file.files;
    if(files.length > 0){
      if(multiple){
        this.setState({
          admin_partners_additionalImages: `Выбранных изображений: ${files.length} `
        })
      } else {
        this.setState({
          [e.target.id]: `Файл выбран`
        })
      }
    } else {
      this.setState({
        [e.target.id]: 'Файл не выбран'
      })
    }
  }

  onChangeLang = e => this.setState({isRu: e.target.value === 'true' ? true : false})

  


  render() {
    if(this.state.isAuthed){
    const partners = this.props.partners;
    return (
      <div className='admin_partners'>
        {
          partners.error
          ?
          <ul>
            {
              partners.error.message.split(',').map(err =>
                <li>
                  <h3 style={{color: 'red'}}>{err}</h3>
                </li>
              )
            }
          </ul>
          : <h3 style={{color: 'green'}}>{this.state.successMessage}</h3>
        }
        {
          this.state.errors ?
            <h3 style={{color: 'red'}}>{this.state.errors}</h3>
            : null
          
        }
        <label className='admin_seo_page_selector'>
        <select className='admin_select' id="admin_select" onChange={this.selectPartner}>
        <option id="default_select" disabled
            selected={this.state.selectedPartner ? false : true}>Выберите компанию</option>
          {
            partners.partners && partners.partners.map(partner => 
              <option value={partner._id} key={partner._id} >
                { partner.company }
              </option>
            )
          }
        </select>
        </label>
        {
          this.state.selectedPartner &&
          <label style={{height: '50px', position: 'absolute', top: '5vw'}} className='admin_seo_page_selector'>
            <select style={{height: '50px'}} id="admin_language_select" onChange={this.onChangeLang}>
              <option value={false} selected={!this.state.isRu}>UA</option>
              <option value={true} selected={this.state.isRu}>RU</option>
            </select>
          </label>
        }
        <button className='action_button' type="button" onClick={() => this.setState(initialState)}>Отменить</button>
        <form onSubmit={this.onSubmit}> 
          <div className='admin_input_line'>
            <h2>Название компании(Company)</h2>
            <input
              className='admin_gallary_input' 
              type="text" 
              id="admin_partners_company" 
              required 
              value={this.state.isRu ? this.state.postRu.admin_partners_company : this.state.post.admin_partners_company} 
              onChange={this.onChange}/>
          </div>
          <div className='admin_input_line'>
            <h3>Описание(Description)</h3>
            {RichTextEditor ? <RichTextEditor
              className='admin_text_aditor'
              value={this.state.isRu ? this.state.postRu.admin_partners_description : this.state.post.admin_partners_description}
              onChange={this.onEditorChange}
              toolbarConfig={toolbarConfig}
            /> : null}
          </div>
          {
            this.state.isRu ? 
            null :
            <div className='admin_input_line'>
            <h2>Url</h2>
            <input 
              className='admin_gallary_input'
              type="text"
              id="admin_partners_url"
              required 
              value={this.state.post.admin_partners_url} 
              onChange={this.onChange}/>
          </div>
          }
          {
            this.state.images.mainImage &&
            <div>
               <img src={this.state.images.mainImage.src} style={{width: '50px', height: '50px'}}/>
               <br/>
              <label>Alt</label><br/>
              <input type="text" value={this.state.images.mainImage.alt} onChange={e => this.onChangeMainImgProps(e, 'alt')}/><br/>
              <label>Title</label><br/>
              <input type="text" value={this.state.images.mainImage.title} onChange={e => this.onChangeMainImgProps(e, 'title')}/>
            </div>
          }
           
          {/* <input type="text"/> */}
          {
            this.state.isRu ?
            null : 
            <label className='admin_input_line'>
            <h2>Главное изображение</h2>
            <span className='admin_custom_file_selector'>{this.state.admin_partners_mainImage}</span>
            <input 
              className='admin_file_selector'
              type="file" 
              accept="image/*" 
              id="admin_partners_mainImage" 
              onChange={this.getFiles}
              required/>
          </label>
          }
          {
            this.state.images.additionalImages && this.state.images.additionalImages.map((file, i) => 
            <div style={{display: 'inline-block', overflowX: 'scroll'}}>
              <img src={file.src} style={{width: '75px', height: '75px'}}/> <br/>
              <input type="text" value={this.state.images.additionalImages[i].alt} onChange={(e) => this.onChangeImgProps(e, i, 'alt')}/><br/>
              <input type="text" value={this.state.images.additionalImages[i].title} onChange={(e) => this.onChangeImgProps(e, i, 'title')}/><br/>
            </div>
          )
          }
          {
            this.state.isRu ? 
            null : 
            <label className='admin_input_line'>
              <h2>Дополнительные изображения</h2>
              <span className='admin_custom_file_selector'>{this.state.admin_partners_additionalImages}</span>
              <input 
                className='admin_file_selector'
                type="file" 
                accept="image/*" 
                id="admin_partners_additionalImages" 
                onChange={this.getFiles}
                multiple required/>
            </label>
          }
          {
           this.state.isRu || this.state.selectedPartner ? 
           null : 
            <label className='admin_input_line'>
            <h2>Видео</h2>
            <span className='admin_custom_file_selector'>{this.state.admin_partners_video}</span>
            <input 
              className='admin_file_selector'
              type="file" 
              accept="video/mp4" 
              id="admin_partners_video" 
              onChange={this.getFiles}
              />
          </label>
          }
          {
             this.state.hasVideo ?
             <div className='admin_input_line'>
             <h2>Название видео</h2>
             <input
               className='admin_gallary_input'
               type="text"
               id="admin_partners_videoName"
               value={this.state.isRu ? this.state.postRu.admin_partners_videoName : this.state.post.admin_partners_videoName}
               onChange={this.onChange}/>
           </div>
           : null
          }
          <div className='admin_action_box'>
          {
            !this.state.edditing 
          }
          {!this.state.edditing && !this.props.partners.isLoading && <button className='action_button' type="submit">Добавить</button>}
          </div>
        </form>
          <div className='admin_action_box'>
          {this.state.edditing && this.state.isRu && <button className='action_button' onClick={this.onSubmitRu}>Редактировать</button>}
          {this.state.selectedPartner && !this.state.isRu && <button className='action_button' onClick={this.onEdit}>Редактировать</button> }
          {this.state.edditing && <button className='action_button' type="button" onClick={this.onDelete}>Удалить</button>}
          </div>
      </div>
    )
  } else {
    return <Redirect to="/login"/>
  }
}
}

const mapStateToProps = (state) => {
  return { 
    partners: state.partners
  }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addPartner,
    getPartners,
    deletePartner,
    editPartner
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(AdminPartners);
