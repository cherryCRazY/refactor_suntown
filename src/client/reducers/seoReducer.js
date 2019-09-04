import { types } from '../actions/types';

const initialState = {};

export const seoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SEO_PAGES:
      return {
        ...state,
        getSeoResult: action.payload
      };
    case types.EDIT_SEO_PAGE:
      return {
        ...state,
        editResult: action.payload
      };
    case types.GET_SEO_BY_URL:
      return {
        ...state,
        getSeoByUrlResult: action.payload
      };  
    case types.GET_ARTICLE_SEO_BY_URL:
      return {
        ...state,
        getArticleSeoByUrlResult: action.payload
      }; 
    default:
      return state;
  }
}