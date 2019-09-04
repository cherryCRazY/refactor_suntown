import { types } from './types';
import { partnersServices } from '../services/partners.services';

export const partnersActions = {
  addPartner,
  getPartners,
  deletePartner,
  editPartner
}

function addPartner(data) {
  return dispatch => {
    dispatch(request())
    partnersServices.addPartner(data)
      .then(data => {
        dispatch(success(data))
      }, error => {
        dispatch(failure(error))
      })
      
    function request() { return { type: types.ADD_PARTNER_REQUEST }}
    function success(partner) { return { type: types.ADD_PARTNER_SUCCESS, partner }}
    function failure(error){ return { type: types.ADD_PARTNER_FAILURE, error }}
  }
}

function getPartners(){
  return dispatch => {
    dispatch(request())
    partnersServices.getPartners()
      .then(data => {
        dispatch(success(data))
      }, error => {
        dispatch(failure(error))
      })

      function request() { return { type: types.GET_PARTNERS_REQUEST }}
      function success(partners) { return { type: types.GET_PARTNERS_SUCCESS, partners }}
      function failure(error){ return { type: types.GET_PARTNERS_FAILURE, error }}
  }
}

function deletePartner(id){
  return dispatch => {
    dispatch(request())
    partnersServices.deletePartner(id)
      .then(data => {
        dispatch(success(data))
      }, error => {
        dispatch(failure(error))
      })

      function request() { return { type: types.DELETE_PARTNER_REQUEST }}
      function success(partner) { return { type: types.DELETE_PARTNER_SUCCESS, partner }}
      function failure(error){ return { type: types.DELETE_PARTNER_FAILURE, error }}
  }
}

function editPartner(id, partner){
  return dispatch => {
    dispatch(request())
    partnersServices.editPartner(id, partner)
      .then(data => {
        dispatch(success(data))
      }, error => {
        dispatch(failure(error))
      })
    function request() { return { type: types.EDIT_PARTNER_REQUEST }}
    function success(partner) { return { type: types.EDIT_PARTNER_SUCCESS, partner }}
    function failure(error){ return { type: types.EDIT_PARTNER_FAILURE, error }}
  }
}