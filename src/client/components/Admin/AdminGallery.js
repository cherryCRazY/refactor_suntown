import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { galleryActions } from '../../actions/galleryActions';
import GalleryImageContainer from './GalleryImageContainer';
import '../../Styles/Admin.css';
import { authServices } from '../../services/auth.services';
import { Redirect } from 'react-router-dom';

const addGalleryPost = galleryActions.addGalleryPost;
const getGalleryPosts = galleryActions.getGalleryPosts;
const editGalleryPost = galleryActions.editGalleryPost;
const deleteGalleryPost = galleryActions.deleteGalleryPost;
const checkToken = authServices.checkToken;

const initialState = {
  galleryData: {
    admin_gallery_description: '',
    admin_gallery_imageAlt: '',
    admin_gallery_imageTitle: ''
  },
  galleryDataRu:{
    admin_gallery_description: '',
  },
  emptyFields: false,
  selectedPost: '',
  isAuthed: true,
  file: 'Файл не выбран',
  video:  'Файл не выбран',
  isRu: false
}

class AdminGallery extends Component {
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
    this.props.getGalleryPosts();
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    checkToken()
    .catch(err => {
      this.setState({ isAuthed: false })
      return
    })
    if(nextProps.gallery.editingGalleryPostError || nextProps.gallery.error){
      this.setState({...this.state, notUnique: true})
      return
    } else if(!nextProps.gallery.error &&  !nextProps.gallery.editingGalleryPostError && !nextProps.gallery.uploadingGalleryPost && !nextProps.gallery.selectedGalleryPost){
      this.setState({...initialState, notUnique: false, emptyFields: false})
    }
    if(!nextProps.gallery.error 
      && nextProps.gallery.selectedGalleryPost 
      && nextProps.gallery.editedGallery
      && !nextProps.gallery.editingGalleryPost){
        this.unselectPost();
    }
    if(nextProps.gallery.selectedGalleryPost){
      const selected = nextProps.gallery.selectedGalleryPost;
      this.setState({
        ...this.state,
        galleryData:{
        admin_gallery_description: selected.description,
        admin_gallery_imageAlt : selected.imageAlt,
        admin_gallery_imageTitle : selected.imageTitle ,
        },
        galleryDataRu: {
          admin_gallery_description: selected.descriptionRu ? selected.descriptionRu : ''
        },
        selectedPost: selected._id,
        emptyFields: false,
        notUnique: false
      })
    }
  }

  selectPost = id => {
    this.props.getSelectedGalleryPost(id);
  }

  unselectPost = () => {
    this.props.unselectGalleryPost();
    this.setState(initialState)
  }

  _mapStateToForm = () => {
    const formData = new FormData();
    const gallery = this.state.galleryData;
    for(let i in gallery){
      if(gallery[i].length < 1){
        this.setState({ emptyFields: true })
        return
      }
      formData.append(i.split('_').pop(), gallery[i])
    }
    return formData;
  }


  onSubmit = () => {
    this.setState({emptyFields: false, notUnique: false})
    const formData = this._mapStateToForm();
    const image = document.getElementById('admin_gallery_image').files[0];
    if(image && formData) {
      formData.append('image', image)
      this.props.addGalleryPost(formData)
      this.setState({ emptyFields: false })
    } else {
      this.setState({ emptyFields: true })
    }
  }

  onChange = e => {
    !this.state.isRu ?
    this.setState({
      ...this.state,
      galleryData: {
        ...this.state.galleryData,
        [e.target.id] : e.target.value
      }
    })
    :
    this.setState({
      ...this.state,
      galleryDataRu: {
        ...this.state.galleryDataRu,
        [e.target.id] : e.target.value
      }
    })
  }

  getFiles = e => {
    const file = document.getElementById(e.target.id).files;
    if(file.length > 0){
      this.setState({ file: 'Файл выбран' })
      return
    }
    this.setState({ file: 'Файл не выбран' })
  }

  getVideo = e => {
    const file = document.getElementById(e.target.id).files;
    if(file.length > 0){
      this.setState({ video: 'Файл выбран' })
      return
    }
    this.setState({ video: 'Файл не выбран' })
  }


  onEdit = () => {
    if(this.state.isRu){
      const formData = new FormData();
      if(this.state.galleryDataRu.admin_gallery_description.length < 1){
        this.setState({ emptyFields: true })
        return
      } else {
        formData.append('descriptionRu', this.state.galleryDataRu.admin_gallery_description)
        formData.append('hasRu', true)
        this.props.editGalleryPost(this.props.gallery.selectedGalleryPost._id, formData);
        return
      }
    }
    const formData = this._mapStateToForm();
    if(!formData){
      this.setState({ emptyFields: true })
      return
    } else {
    if(formData){
      const image = document.getElementById('admin_gallery_image').files[0];
      if(image) {
        formData.append('image', image)
      }
      this.props.editGalleryPost(this.props.gallery.selectedGalleryPost._id, formData);
    }
  }
  }

  onDelete = () => {
    this.props.deleteGalleryPost(this.props.gallery.selectedGalleryPost._id);
    this.setState(initialState)
  }

  onChangeLang = e => this.setState({isRu: e.target.value === 'true' ? true : false})

  render() {
    if(this.state.isAuthed){
    return (
      <div className='admin'>
        <div className='admin_photo_box'>
          {
              this.props.gallery.galleryPosts
              && this.props.gallery.galleryPosts.length > 0
              && <GalleryImageContainer
                galleryImages={this.props.gallery.galleryPosts}
                selectPost={this.selectPost}
                selectedPost={this.state.selectedPost}
                />
          }
        </div>
        {
          this.props.gallery.selectedGalleryPost &&
          <label className='admin_seo_page_selector'>
            <select id="admin_language_select" onChange={this.onChangeLang}>
              <option value={false} selected={!this.state.isRu}>UA</option>
              <option value={true} selected={this.state.isRu}>RU</option>
            </select>
          </label>
        }
        <button className='action_button' onClick={() => this.unselectPost()}>
            Отменить
          </button>
        {
          this.props.gallery.uploadingGalleryPost ? <h2>Loading post ...</h2> : null
         }
         {
           this.state.emptyFields ? <h2 style={{color: 'red'}}>Заполните все поля</h2> : null
         }
        {
          this.props.gallery.error
          ?
          <ul>
            {
              this.props.gallery.error.message.split(',').map(err =>
                <li>
                  <h3 style={{color: 'red'}}>{err}</h3>
                </li>
              )
            }
          </ul>
          : null
          // this.state.notUnique && <h2 style={{color: 'red'}}>{this.props.gallery.error || this.props.gallery.editingGalleryPostError}</h2>
        }
        <form>
          <div className='admin_input_line'>
            <h2>Описание(description)</h2>
            <input className='admin_gallary_input' type="text"
              id="admin_gallery_description"
              value={this.state.isRu ? this.state.galleryDataRu.admin_gallery_description : this.state.galleryData.admin_gallery_description}
              onChange={this.onChange}
            />
          </div>
          {
            !this.state.isRu ?
            <div className='admin_input_line'>
            <h2>Альт изображения(imageAlt)</h2>
            <input className='admin_gallary_input' type="text"
              id="admin_gallery_imageAlt"
              value={this.state.galleryData.admin_gallery_imageAlt}
              onChange={this.onChange}
            />
          </div> : null
          }
          {
            !this.state.isRu ? <div className='admin_input_line'>
            <h2>Тайтл изображения(imageTitle)</h2>
            <input className='admin_gallary_input' type="text"
              id="admin_gallery_imageTitle"
              value={this.state.galleryData.admin_gallery_imageTitle}
              onChange={this.onChange}
            />
          </div> : null
          }
          {
           !this.state.isRu ? <label className='admin_input_line'>
            <h2>Файл</h2>
            <span className='admin_custom_file_selector'>
              {this.state.file}
            </span>
            <input className='admin_file_selector' type="file" accept="image/*, video/mp4" id="admin_gallery_image" onChange={this.getFiles}/>
          </label> : null
          }
          {/* {
           !this.state.isRu ? <label className='admin_input_line'>
            <h2>Видео</h2>
            <span className='admin_custom_file_selector'>
              {this.state.video}
            </span>
            <input className='admin_file_selector' type="file" accept="video/*" id="admin_gallery_video" onChange={this.getVideo}/>
          </label> : null
          } */}
        </form>
        {
          this.props.gallery.selectedGalleryPost ?
            <div>
              <button className='action_button' onClick={this.onEdit}>Редактировать</button>
              <button className='action_button' onClick={this.onDelete}>Удалить</button>
            </div>
            : <button className='action_button' onClick={this.onSubmit}>Загрузить</button>
        }
      </div>
    )
  } else {
    return <Redirect to="/login"/>
  }
  }
}

const mapStateToProps = (state) => {
  return { 
    gallery: state.gallery
  }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addGalleryPost,
    getGalleryPosts,
    editGalleryPost,
    deleteGalleryPost,
    getSelectedGalleryPost: id => dispatch({id, type: 'GET_SELECTED_GALLERY_POST'}),
    unselectGalleryPost: () => dispatch({type: 'UNSELECT_GALLERY_POST'})
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(AdminGallery);
