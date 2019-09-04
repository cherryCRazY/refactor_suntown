import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import Loadable from "react-loadable";

const app = express();

app.use(express.static("public"));
app.use("/static", express.static("./static"));
app.use("/product/", express.static("./static/media"));

app.get("*", (req, res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            console.log("route", route);
            console.log("object", route.loadData);
            return route.loadData ? route.loadData(store, req.path) : null;
        })
        .map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });

    Promise.all(promises)
        .then(() => {
            try {
                const context = {};
                const content = renderer(req, store, context);

                if (context.url) {
                    res.redirect(301, context.url);
                }
                console.log("content", content.url);
                console.log("context", context.notFound);
                if (context.notFound) {
                    res.status(404);
                }

                res.send(content);
            } catch (err) {
                console.log(err);
            }
        })
        .catch(err => {
            console.log(err);
        });
});

Loadable.preloadAll().then(() => {
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
});
