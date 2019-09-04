import { types } from './types';
import { authServices } from '../services/auth.services';

export const authActions = {
  login
}


function login(userData) {
  return dispatch => {
    console.log(userData)
    dispatch(request())
    authServices.login(userData)
      .then(data => {
        dispatch(success(data.user))
      }, error => {
        dispatch(failure(error))
      })
      
    function request() { return { type: types.LOGIN_REQUEST }}
    function success(user) { return { type: types.LOGIN_SUCCESS, user }}
    function failure(error){ return { type: types.LOGIN_FAILURE, error }}
  }
}


// function checkToken(userData) {
//   return dispatch => {
//     authServices.login(userData)
//       .catch(error => {
//         dispatch(failure(error))
//       })
//     function failure(error){ return { type: types.LOGIN_FAILURE, error }}
//   }
// }

// function logout(){
//   return dispatch => 
// }