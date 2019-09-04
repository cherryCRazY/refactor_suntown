import { types } from '../actions/types';

const initialState = {};

export const galleryReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADD_GALLERY_POST_REQUEST: 
      return {
        ...state,
        uploadingGalleryPost: true
      }
    case types.ADD_GALLERY_POST_SUCCESS: 
    return {
      ...state,
      error: '',
      uploadingGalleryPost: false,
      galleryPosts: state.galleryPosts.length ? [...state.galleryPosts, action.post] : []
    }
    case types.ADD_GALLERY_POST_FAILURE: 
    return {
      ...state,
      uploadingGalleryPost: false,
      error: action.error
    }

    case types.GET_GALLERY_POSTS_REQUEST: 
    return {
      ...state,
      loadingGalleryPost: true
    }
    case types.GET_GALLERY_POSTS_SUCCESS: 
    return {
      ...state,
      error: '',
      loadingGalleryPost: false,
      galleryPosts: action.posts ? [...action.posts] : action.posts
    }
    case types.GET_GALLERY_POSTS_FAILURE: 
    return {
      ...state,
      loadingGalleryPost: false,
      loadingGalleryPostError: action.error.message
    }

    case types.GET_SELECTED_GALLERY_POST:
    return {
      ...state,
      error: '',
      editedGallery: false,
      editingGalleryPostError: '',
      selectedGalleryPost : state.galleryPosts.filter(post => post._id === action.id)[0]
    }

    case types.UNSELECT_GALLERY_POST:
    return {
      ...state,
      selectedGalleryPost: null
    }

    case types.EDIT_GALLERY_POST_REQUEST:
    return {
        ...state,
        error: '',
        editingGalleryPost: true
    };
    case types.EDIT_GALLERY_POST_SUCCESS:
      return {
        ...state,
        editedGallery: true,
        editingGalleryPost: false,
        error: '',
        galleryPosts: state.galleryPosts.map(post => {
          if(post._id === action.galleryPost._id){
            return {...action.galleryPost}
          } return post
        }),
        editingGalleryPostError: ''
      };
    case types.EDIT_GALLERY_POST_FAILURE:
      return {
        ...state,
        editingGalleryPost: false,
        editingGalleryPostError: action.error.message
      };

      case types.DELETE_GALLERY_POST_REQUEST:
    return {
        ...state,
        deletingGalleryPost: true
    };
    case types.DELETE_GALLERY_POST_SUCCESS:
      return {
        ...state,
        deletingGalleryPost: false,
        galleryPosts: state.galleryPosts.filter(post => post._id !== action.id)
      };
    case types.DELETE_GALLERY_POST_FAILURE:
      return {
        ...state,
        deletingArticle: false,
        deletingArticleError: action.error
      };

    default:
      return state
  }
}