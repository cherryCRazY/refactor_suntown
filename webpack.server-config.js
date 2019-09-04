const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");

const env =
    process.env && process.env.NODE_ENV.trim() == "production"
        ? "production"
        : "development";

const defaultOption = require("./webpack.base-config");

const options = {
    target: "node",
    devtool: "source-map",
    externals: [webpackNodeExternals()],
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js"
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            window: undefined,
            navigator: undefined
        })
    ]
};

module.exports = merge(defaultOption, options);
