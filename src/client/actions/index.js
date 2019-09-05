import { types } from "./types";
import { userServices } from "../services/user.services";

export const userActions = {
    addArticle,
    getArticles,
    editArticle,
    deleteArticle
};

function addArticle(article) {
    return dispatch => {
        dispatch(request());

        userServices.addArticle(article).then(
            article => {
                dispatch(success(article));
            },
            error => {
                console.log("errorrrrrr");
                dispatch(failure(error));
            }
        );

        function request() {
            return { type: types.ADD_ARTICLE_REQUEST };
        }
        function success(article) {
            return { type: types.ADD_ARTICLE_SUCCESS, article };
        }
        function failure(error) {
            return { type: types.ADD_ARTICLE_FAILURE, error };
        }
    };
}

function getArticles(url) {
    return dispatch => {
        dispatch(request());

        return userServices.getArticles().then(
            articles => {
                dispatch(success(articles));
                url
                    ? dispatch({ url, type: "GET_SELECTED_ARTICLE_BY_URL" })
                    : null;
            },
            error => {
                dispatch(failure(error));
            }
        );

        function request() {
            return { type: types.GET_ARTICLES_REQUEST };
        }
        function success(articles) {
            return { type: types.GET_ARTICLES_SUCCESS, articles };
        }
        function failure(error) {
            return { type: types.GET_ARTICLES_FAILURE, error };
        }
    };
}

function editArticle(id, data) {
    return dispatch => {
        dispatch(request());

        userServices.editArticle(id, data).then(
            article => {
                dispatch(success(article));
            },
            error => {
                dispatch(failure(error));
            }
        );

        function request() {
            return { type: types.EDIT_ARTICLE_REQUEST };
        }
        function success(article) {
            return { type: types.EDIT_ARTICLE_SUCCESS, article };
        }
        function failure(error) {
            return { type: types.EDIT_ARTICLE_FAILURE, error };
        }
    };
}

function deleteArticle(id) {
    return dispatch => {
        dispatch(request());

        userServices.deleteArticle(id).then(
            article => {
                dispatch(success(article._id));
            },
            error => {
                dispatch(failure(error));
            }
        );

        function request() {
            return { type: types.DELETE_ARTICLE_REQUEST };
        }
        function success(id) {
            return { type: types.DELETE_ARTICLE_SUCCESS, id };
        }
        function failure(error) {
            return { type: types.DELETE_ARTICLE_FAILURE, error };
        }
    };
}
