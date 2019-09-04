import { types } from '../actions/types';

const initialState = {};

export const partnersReducer = (state = initialState, action) => {
  switch(action.type){
    case types.ADD_PARTNER_REQUEST: 
    return {
      ...state,
      isLoading: true
    }
    case types.ADD_PARTNER_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      error: '',
      partners: state.partners ? [...state.partners, action.partner] : [action.partner]
    }
    case types.ADD_PARTNER_FAILURE: 
    return {
      ...state,
      isLoading: false,
      error: action.error
    }

    case types.GET_PARTNERS_REQUEST: 
    return {
      ...state,
      isLoading: true
    }
    case types.GET_PARTNERS_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      error: '',
      partners: action.partners
    }
    case types.GET_PARTNERS_FAILURE: 
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
    
    case types.DELETE_PARTNER_REQUEST: 
    return {
      ...state,
      isLoading: true
    }
    case types.DELETE_PARTNER_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      error: '',
      partners: state.partners.filter(partner => partner._id !== action.partner._id)
    }
    case types.DELETE_PARTNER_FAILURE: 
    return {
      ...state,
      isLoading: false,
      error: action.error
    }

    case types.EDIT_PARTNER_REQUEST:
    return {
      ...state,
      isLoading: true
    }

    case types.EDIT_PARTNER_SUCCESS:
      return {
        isLoading: false,
        partners: state.partners.map(partner => {
          if(partner._id === action.partner._id){
            return {...action.partner}
          } return partner
        }),
        error: ''
      };

    case types.EDIT_PARTNER_FALIURE:
    return {
      isLoading: false,
      error: action.error.message
    }

    default:
      return state
  }
}