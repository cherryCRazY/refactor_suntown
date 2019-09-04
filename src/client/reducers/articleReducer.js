import { types } from "../actions/types";

const initialState = {};

export const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ARTICLE_REQUEST:
            return {
                ...state,
                uploadingArticle: true
            };
        case types.ADD_ARTICLE_SUCCESS:
            return {
                loadedArticle: true,
                uploadedArticle: true,
                articles: [action.article, ...state.articles]
            };
        case types.ADD_ARTICLE_FAILURE:
            return {
                ...state,
                error: action.error.message,
                uploadedArticle: false
            };

        case types.GET_ARTICLES_REQUEST:
            console.log("GET_ARTICLES_REQUEST");
            return {
                doneSorting: false,
                loadingArticle: true
            };
        case types.GET_ARTICLES_SUCCESS:
            console.log("getArtickle_Succes");
            return {
                loadedArticle: true,
                articles: action.articles.length ? [...action.articles] : []
            };
        case types.GET_ARTICLES_FAILURE:
            return {
                ...state,
                loadedArticle: false
            };

        case types.GET_SELECTED_ARTICLE:
            return {
                ...state,
                error: "",
                editedArticle: false,
                selectedArticle: state.articles.filter(
                    article => article._id === action.id
                )[0]
            };

        case types.GET_SELECTED_ARTICLE_BY_URL:
            console.log("action", action);
            console.log("state.articles");
            console.log(state.articles);

            return {
                ...state,
                selectedArticleByUrl: state.articles.filter(
                    article => article.url === action.url
                )[0],
                doneSorting: true
            };

        case types.UNSELECT_ARTCILE:
            return {
                ...state,
                selectedArticle: null
            };

        case types.EDIT_ARTICLE_REQUEST:
            return {
                ...state,
                edititngArticle: true
            };
        case types.EDIT_ARTICLE_SUCCESS:
            return {
                loadedArticle: true,
                editedArticle: true,
                articles: state.articles.map(article => {
                    if (article._id === action.article._id) {
                        return { ...action.article };
                    }
                    return article;
                }),
                error: ""
            };
        case types.EDIT_ARTICLE_FAILURE:
            return {
                ...state,
                editedArticle: false,
                error: action.error.message
            };

        case types.DELETE_ARTICLE_REQUEST:
            return {
                ...state,
                deletingArticle: true
            };
        case types.DELETE_ARTICLE_SUCCESS:
            return {
                loadedArticle: true,
                editedArticle: true,
                selectedArticle: null,
                deletedArticle: true,
                articles: state.articles.filter(
                    article => article._id !== action.id
                )
            };
        case types.DELETE_ARTICLE_FAILURE:
            return {
                ...state,
                deletedArticle: false
            };

        default:
            return state;
    }
};
