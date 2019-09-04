import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';
import { authServices } from '../../services/auth.services';
import ls from 'local-storage';

let RichTextEditor; 
var DatetimeInput

if (process.env.BROWSER) { 
  console.log('process.env.BROWSER', process.env.BROWSER)
  RichTextEditor = require('react-rte').default;
  var {DatetimeInput}= require("react-datetime-inputs/dist/datetime-inputs")
}


const moment = require('moment');
const checkToken = authServices.checkToken;
const addArticle = userActions.addArticle;
const getArticles = userActions.getArticles;
const editArticle = userActions.editArticle;
const deleteArticle = userActions.deleteArticle;

const toolbarConfig = require('../../utils');

const initialState = {
  post: {
    admin_title: '',
    admin_description: '',
    admin_date: '',
    mainImage: {
    },
    admin_url: '',
    
    admin_content: RichTextEditor ? RichTextEditor.createEmptyValue() :null,
  },
  postRu: {
    admin_title: '',
    admin_description: '',
    admin_content: RichTextEditor ? RichTextEditor.createEmptyValue() : null,
  },
  isRu: false,
  selectedPost: false,
  selectedPostId: '',
  emptyFields: false,
  wrongUrlFormat: false,
  uploaded: false,
  notUnique: false,
  isAuthed: true,
  file: 'Файл не выбран'
};

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  componentDidMount(){
    checkToken()
      .catch(err => {
        this.setState({ isAuthed: false })
        return
      })
    this.props.getArticles()
  }

  componentWillReceiveProps(nextProps){
    checkToken()
      .catch(err => {
        this.setState({ isAuthed: false })
        return
      })
    if(!nextProps.auth.isAuthenticated ){
      this.setState({ isAuthed: false })
      return
    }
    if(nextProps.article.error){
      if(this.state.selectedPostId){
        if(this.state.selectedPostId === nextProps.article.selectedArticle._id){
          this.setState({...this.state, notUnique: true, emptyFields: false})
          return
        }
      }else if(nextProps.article.uploadingArticle){
        this.setState({...this.state, notUnique: true, emptyFields: false})
          return
      }
    } else if(!nextProps.article.error && !nextProps.article.uploadingArticle){
      this.setState({...initialState, notUnique: false, emptyFields: false})
    }
    if(!nextProps.article.error
      && nextProps.article.selectedArticle
      && nextProps.article.editedArticle
      && !nextProps.article.edititngArticle){
      this.unselectArticle()
    }
    if(nextProps.article.selectedArticle){
      // if(nextProps.article.selectedArticle.hasRu){
        const {
          titleRu,
          descriptionRu,
          contentRu } = nextProps.article.selectedArticle;
        // 
    const {
      title : admin_title,
      description : admin_description,
      date : admin_date,
      url : admin_url,
      mainImage,
      content: admin_content } = nextProps.article.selectedArticle;
    this.setState({
      ...this.state,
      post: {
        admin_title,
        admin_description,
        admin_date: moment(admin_date),
        admin_url,
        mainImage,
        admin_content:  RichTextEditor ?  RichTextEditor.createValueFromString(admin_content, 'html') :null
      },
      postRu: {
        admin_title : titleRu ? titleRu : '',
        admin_description : descriptionRu ? descriptionRu: '',
        admin_content : contentRu ? (RichTextEditor ?  RichTextEditor.createValueFromString(contentRu, 'html') :null) : (RichTextEditor ? RichTextEditor.createEmptyValue() :null)
      },
      isRu: false,
      selectedPost: true,
      selectedPostId: nextProps.article.selectedArticle._id,
      emptyFields: false,
      notUnique: false
    })
  } 
  
  }

  setError = err => {
    this.setState({
      ...this.state,
      errors: err
    })
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
    : this.setState({
      ...this.state,
      postRu: {
        ...this.state.postRu,
        [e.target.id] : e.target.value
      }
    }, () => console.log(this.state.postRu))
  };

  _filterEditorContent = () => {
    let editorData = this.state.post.admin_content.toString('html').trim();
    let filteredData = editorData.replace(/<p>/g,'').replace(/<br>/g,'').replace(/<\/p>/g,'').trim();
    return filteredData.length;
  }

  appendRu = () => {
    this.setState({ notUnique: false, wrongUrlFormat: false, emptyFields: false })
    const formData = new FormData();
    for(let i in this.state.postRu){
      if(i !== 'admin_content'){
      if(this.state.postRu[i].length < 1){
        this.setState({...this.state, emptyFields: true})
        return
      }
      const formatedData = i.split('_')[1] + 'Ru'
      formData.append(formatedData, this.state.postRu[i].trim())
    } else{
      if(this._filterEditorContent() < 1){
        this.setState({...this.state, emptyFields: true})
        return
      }
      formData.append('contentRu', this.state.postRu[i].toString('html').trim())
    }
  }
  formData.append('hasRu', true)
  this.setState({...this.state, emptyFields: false})
    return formData
}

  appendFormData = (ru = false, asFormData = true) => {
    this.setState({ notUnique: false, wrongUrlFormat: false, emptyFields: false })
    const formData = new FormData();
    const lang = this.state.post;
    for(let i in lang){
      if(lang[i].length < 1){
        this.setState({...this.state, emptyFields: true})
        return
      }
      if(i === 'admin_url'){
        if(!(/^[a-zA-Z0-9_-]*$/.test(lang[i]))){
          this.setState({ wrongUrlFormat: true })
          return
        }
      }
      if(i !== 'admin_content' && i !== 'mainImage'){
        const formatedData = i.split('_')[1]
        if(i === 'admin_date'){
          formData.append(formatedData, lang[i].toString())
        } else {
          formData.append(formatedData, lang[i].trim())
        }
      } else if(i !== 'mainImage'){
        if(this._filterEditorContent() < 1){
          this.setState({...this.state, emptyFields: true})
          return
        }
        formData.append('content', lang[i].toString('html').trim())
      }
    }
    if(asFormData) return formData
    let data = {};
    formData.forEach((value, key) => data[key] = value );
    this.setState({...this.state, emptyFields: false})
    return data;
  }

  onEditorChange = admin_content => {
    !this.state.isRu ?
    this.setState({
    ...this.state,
    post:{
      ...this.state.post,
      admin_content
    } 
  })
  :this.setState({
    ...this.state,
    postRu:{
      ...this.state.postRu,
      admin_content
    } 
  })
}

  selectArticle = e => {
    this.props.getSelectedArticle(e.target.value)
  }

  unselectArticle = e => {
    if(e) e.preventDefault()
    this.props.unselectArticle()
    this.setState(initialState)
  }

  onSubmit = () => {
    if(ls.get('token') !== null){
      const formData = this.appendFormData();
      const mainImage = this.state.post.mainImage;
      if(!mainImage) {
        this.setState({ emptyFields: true })
      }
      if(mainImage && formData) {
        formData.append('mainImage', JSON.stringify(mainImage))
        this.props.addArticle(formData)
      }
    } else {
      this.setState({
        isAuthed: false
      })
    }
  }

  onSubmitRu = () => {
    if(ls.get('token') !== null){
      const formData = this.appendRu();
      if(formData) {
        this.props.editArticle(this.props.article.selectedArticle._id, formData);
      }
    } else {
      this.setState({
        isAuthed: false
      })
    }
  }

  onEdit = () => {
    if(ls.get('token') !== null){
    const formData = this.appendFormData();
    if(formData){
      const mainImage = this.state.post.mainImage;
      if(mainImage){
        formData.append('mainImage', JSON.stringify(mainImage))
      }
      this.props.editArticle(this.props.article.selectedArticle._id, formData);
    }
    }else {
      this.setState({
        isAuthed: false
      })
    }
  }

  onDelete = () => {
    if(ls.get('token') !== null){
    this.props.deleteArticle(this.props.article.selectedArticle._id);
    this.setState(initialState)
    }else {
      this.setState({
        isAuthed: false
      })
    }
  }

  onChangeLang = e => this.setState({isRu: e.target.value === 'true' ? true : false})

  // getFiles = e => {
  //   const file = document.getElementById(e.target.id).files;
  //   if(file.length > 0){
  //     this.setState({ file: 'Файл выбран' })
  //     return
  //   }
  //   this.setState({ file: 'Файл не выбран' })
  // }

  showPreview = async (id) => {
    const file = document.getElementById(id);
    const files = file.files;

    if(files[0]){
      this.setState({
        post: {
          ...this.state.post,
          mainImage: {
            src: await this.readFile(files[0]),
            alt: '',
            title: ''
          }
        }
      })
    }
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

  changeImgProps = (e, type) => this.setState({ post: {
    ... this.state.post,
    mainImage: {
      ...this.state.post.mainImage,
      [type]: e.target.value
    }
  } })

  getFiles = e => {
    const file = document.getElementById('admin_image');
    this.showPreview('admin_image');
    if(file){
      this.setState({ file: 'Файл выбран' });
    }
  }

  render() {
    if(this.state.isAuthed){
    const article = this.props.article;
    return (
      <div className='admin'>
        {
          article.loadedArticle ? 
          <label className='admin_seo_page_selector'>
          <select className='admin_select' id="admin_select" onChange={this.selectArticle}>
          <option id="default_select" disabled
            selected={this.state.selectedPost ? false : true}>Выбрать статью</option>
            {
              article.articles.map(article =>
                <option value={article._id} key={article._id}>{article.title}</option>
              )
            }
          </select>
          </label> : <h2>Loading</h2>
        }
        {
          article.selectedArticle && 
          <label className='admin_seo_page_selector'>
            <select id="admin_language_select" onChange={this.onChangeLang}>
              <option value={false} selected={!this.state.isRu}>UA</option>
              <option value={true} selected={this.state.isRu}>RU</option>
            </select>
          </label>
        }
        <button className='action_button' onClick={this.unselectArticle}>
          Отменить
        </button>
        {
          this.state.emptyFields && <h2 style={{color: 'red'}}>Заполните все поля</h2>
        }
        {
          this.state.wrongUrlFormat && <h2 style={{color: 'red'}}>Ссылка не должна содержать специальные символы кроме '-, _' или не латинские символы</h2>
        }
        {
          this.state.notUnique && !this.state.emptyFields && <h2 style={{color: 'red'}}>{
            <ul>
            {
              article.error.split(',').map(err =>
                <li>
                  <h3 style={{color: 'red'}}>{err}</h3>
                </li>
              )
            }
          </ul>
          }</h2>
        }
        <form action=''>
          <div className='admin_input_line'>
            <h2>Название статьи(title)</h2>
            <input
              className='admin_gallary_input'
              type="text" 
              id="admin_title"
              value={this.state.isRu ? this.state.postRu.admin_title : this.state.post.admin_title} 
              onChange={this.onChange}
            />
          </div>
          <div className='admin_input_line'>
            <h2>Описание(description)</h2>
            <input
              className='admin_gallary_input'
              type="text" 
              value={this.state.isRu ? this.state.postRu.admin_description : this.state.post.admin_description} 
              id="admin_description"
              onChange={this.onChange}
            />
          </div>
          {
            this.state.isRu ? null :
            <div className='admin_input_line'>
            <h2>Url</h2>
            <input
              className='admin_gallary_input'
              type="text"
              value={this.state.post.admin_url} 
              id="admin_url"
              onChange={this.onChange}
            />
          </div>
          }
          {
            this.state.post.mainImage.src &&
            <div>
               <img src={this.state.post.mainImage.src} style={{width: '50px', height: '50px'}}/>
               <br/>
              <label>Alt</label><br/>
              <input type="text" value={this.state.post.mainImage.alt} onChange={e => this.changeImgProps(e, 'alt')}/><br/>
              <label>Title</label><br/>
              <input type="text" value={this.state.post.mainImage.title} onChange={e => this.changeImgProps(e, 'title')}/>
            </div>
          }
          {
            this.state.isRu ? null :
            <label className='admin_input_line'>
            <h2>Изображение</h2>
            <span className='admin_custom_file_selector'>{this.state.file}</span>
            <input 
              className='admin_file_selector'
              type="file" 
              value={this.state.post.admin_image}
              id="admin_image"
              accept="image/*"
              onChange={this.getFiles}
            />
            </label>
          }
          <div className='admin_input_line'>
          <h2>Текст(content)</h2>
      {RichTextEditor ?     <RichTextEditor
            className='admin_text_aditor'
            value={this.state.isRu ? this.state.postRu.admin_content : this.state.post.admin_content}
            onChange={this.onEditorChange}
            toolbarConfig={toolbarConfig}
          /> : null}
          </div>
          {
            !this.state.isRu &&
            <div className='admin_input_line admin_date_box'>
            <h2>Дата</h2>
            <div className='admin_datetime_input'>
           {DatetimeInput ? <DatetimeInput
              datetime={this.state.post.admin_date}
              placeholder="Выберите дату"
              onChange={(date) => this.setState({ post: { ...this.state.post, admin_date: date }}, () => console.log(this.state.post.admin_date))}>
            </DatetimeInput> : null}
            {/* {DatetimeInput ? <DatetimeInput></DatetimeInput> : null} */}
            </div>
            </div>
          }
        </form>
        <div className='admin_action_box'>
          {
            this.props.article.selectedArticle ?
              <div className='admin_action_box'>
                <button className='action_button' onClick={this.state.isRu ? this.onSubmitRu : this.onEdit}>Редактировать</button>
                <button className='action_button' onClick={this.onDelete}>Удалить</button>
              </div>
              : <button className='action_button' onClick={this.onSubmit}>Загрузить</button>
          }
          <button className='action_button' onClick={() => this.props.logout()}>Выйти</button>
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
    article: state.articles,
    auth: state.auth
  }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addArticle,
    getArticles,
    editArticle,
    deleteArticle,
    checkToken,
    getSelectedArticle: id => dispatch({id, type: 'GET_SELECTED_ARTICLE'}),
    unselectArticle: () => dispatch({type: 'UNSELECT_ARTCILE'}),
    logout: function(){
      return dispatch => {
        dispatch({ type: 'LOGOUT_REQUEST' })
        ls.remove('token')
        dispatch({ type: 'LOGOUT_SUCCESS' })
      }
    }
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Admin);