import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';
import { galleryReducer } from './galleryReducer';
import { authReducer } from './authReducer';
import { partnersReducer } from './partnersReducer';
import { seoReducer } from './seoReducer';
import { languageReducer } from './languageReducer';

export default combineReducers({
  articles: articleReducer,
  gallery: galleryReducer,
  auth: authReducer,
  partners: partnersReducer,
  seo: seoReducer,
  lang: languageReducer
});