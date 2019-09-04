// Startup point for the client side application
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import Loadable from "react-loadable";

import Routes from "./Routes";

import favicon from "./media/favicon.ico";

import store from "./store";

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Provider store={store()}>
            <BrowserRouter>
                <div>{renderRoutes(Routes)}</div>
            </BrowserRouter>
        </Provider>,
        document.querySelector("#root")
    );
});
