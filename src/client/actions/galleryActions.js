import { types } from './types';
import { galleryServices } from '../services/gallery.services';

export const galleryActions = {
  addGalleryPost,
  getGalleryPosts,
  editGalleryPost,
  deleteGalleryPost
}

function addGalleryPost(post) {
  return dispatch => {
    dispatch(request());

    galleryServices.addGalleryPost(post)
      .then(post => {
        dispatch(success(post));
      }, error => {
        dispatch(failure(error));
      })

      function request() { return { type: types.ADD_GALLERY_POST_REQUEST }}
      function success(post) { return { type: types.ADD_GALLERY_POST_SUCCESS, post }}
      function failure(error){ return { type: types.ADD_GALLERY_POST_FAILURE, error }}
  }
}

function getGalleryPosts() {
  return dispatch => {
    dispatch(request());

    galleryServices.getGalleryPosts()
      .then(posts => {
        dispatch(success(posts))
      }, error => {
        dispatch(failure(error))
      })
      function request() { return { type: types.GET_GALLERY_POSTS_REQUEST }}
      function success(posts) { return { type: types.GET_GALLERY_POSTS_SUCCESS, posts }}
      function failure(error){ return { type: types.GET_GALLERY_POSTS_FAILURE, error }}
  }
}

function editGalleryPost(id, data) {
  return dispatch => {
    dispatch(request());

    galleryServices.editGalleryPost(id, data)
      .then(post => {
        dispatch(success(post));
      }, error => {
        dispatch(failure(error));
      })

      function request() { return { type: types.EDIT_GALLERY_POST_REQUEST }}
      function success(galleryPost) { return { type: types.EDIT_GALLERY_POST_SUCCESS, galleryPost }}
      function failure(error){ return { type: types.EDIT_GALLERY_POST_FAILURE, error }}
  }
}

function deleteGalleryPost(id) {
  return dispatch => {
    dispatch(request());

    galleryServices.deleteGalleryPost(id)
      .then(post => {
        dispatch(success(post._id));
      }, error => {
        dispatch(failure(error));
      })

      function request() { return { type: types.DELETE_GALLERY_POST_REQUEST }}
      function success(id) { return { type: types.DELETE_GALLERY_POST_SUCCESS, id }}
      function failure(error){ return { type: types.DELETE_GALLERY_POST_FAILURE, error }}
  }
}