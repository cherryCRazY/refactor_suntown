import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "../client/reducers";
import https from "https";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

export default req => {
    const axiosInstance = axios.create({
        baseURL: "http://suntown-ukraine.com/api/",
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );

    return store;
};
