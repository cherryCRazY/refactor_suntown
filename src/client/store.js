import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://suntown-ukraine.com/api"
});

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const createAppStore = (reducer, initialState, middleware = []) => {
    middleware.push(thunk.withExtraArgument(axiosInstance));
    return createStore(
        reducer,
        {},
        composeEnhancers(applyMiddleware(...middleware))
    );
};

export default function configureStore(
    initialState = window.INITIAL_STATE,
    middleware = []
) {
    return createAppStore(reducer, initialState, middleware);
}
