import { types } from "./types";
import { seoServices } from "../services/seo.services";

const getSeoPages = () => dispatch => {
    return seoServices.getSeoPages().then(result =>
        dispatch({
            type: types.GET_SEO_PAGES,
            payload: result
        })
    );
};

const getSeoByUrl = (url, lang) => dispatch => {
    return seoServices.getSeoByUrl(url, lang).then(result =>
        dispatch({
            type: types.GET_SEO_BY_URL,
            payload: result
        })
    );
};

const getArticleSeoByUrl = url => dispatch => {
    return seoServices.getArticleSeoByUrl(url).then(result =>
        dispatch({
            type: types.GET_ARTICLE_SEO_BY_URL,
            payload: result
        }).then(res => console.log("res", res))
    );
};

const editSeoPage = (pageId, seoData) => dispatch => {
    return seoServices.editSeoPages(pageId, seoData).then(result =>
        dispatch({
            type: types.EDIT_SEO_PAGE,
            payload: result
        })
    );
};

export const seoActions = {
    getSeoPages,
    getSeoByUrl,
    getArticleSeoByUrl,
    editSeoPage
};
