import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import Routes from "../client/Routes";
import Loadable from "react-loadable";

import { getBundles } from "react-loadable/webpack";
import stats from "../../react-loadable.json";

export default (req, store, context) => {
    let modules = [];

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <Loadable.Capture
                    report={moduleName => modules.push(moduleName)}
                >
                    <div>{renderRoutes(Routes)}</div>
                </Loadable.Capture>
            </StaticRouter>
        </Provider>
    );

    const helmet = Helmet.renderStatic();

    let bundles = getBundles(stats, modules);
    let scripts = bundles.filter(
        bundle => bundle && bundle.file.endsWith(".js")
    );
      
    return `
    <!doctype html>
    <html lang="ru">
      <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
        <meta name="theme-color" content="#85B728">
        <link href="/static/css/main.css" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="shortcut icon" href="/product/favicon.ico"/>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="/static/bundle.js"></script>
        ${scripts
            .map(script => {
                return `<script src="/${script && script.file}"></script>`;
            })
            .join("\n")}
      </body>
    </html>
  `;
};
