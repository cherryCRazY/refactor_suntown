const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const reactLoadablePlugin = require("react-loadable/webpack")
    .ReactLoadablePlugin;

const defaultOption = require("./webpack.base-config");

const options = {
    target: "web",
    entry: {
        bundle: path.join(__dirname, "./src/client/client.js")
    },
    output: {
        filename: "static/[name].js",
        path: path.resolve(__dirname, "dist"),
        chunkFilename: "static/[name].js",
        publicPath: "/"
    },
    devtool: "source-map",

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            children: true,
            async: true
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new reactLoadablePlugin({
            filename: "./react-loadable.json"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
};

if (process.env.NODE_ENV === "production") {
    options.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: true,
            minimize: true
        }),
        new CompressionPlugin({
            algorithm: "gzip"
        })
    );
}
options.plugins.push(new BundleAnalyzerPlugin());

module.exports = merge(defaultOption, options);
