import { types } from "../actions/types";
import ls from "local-storage";

const initialState = {
    isFetching: false,
    isAuthenticated: ls.get("token") ? true : false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.user,
                errorMessage: ""
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.error
            };

        case types.LOGOUT_REQUEST:
            return {
                isFetching: true,
                isAuthenticated: true
            };
        case types.LOGOUT_SUCCESS:
            return {
                isFetching: false,
                isAuthenticated: false,
                user: "",
                errorMessage: ""
            };
        case types.LOGOUT_FAILURE:
            return {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};
