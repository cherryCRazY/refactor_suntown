const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: [
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.svg$/,
                    /\.ico$/,
                    /\.pdf$/
                ],
                loader: "url-loader",
                options: {
                    limit: 1000,
                    name: "static/media/[name].[ext]",
                    publicPath: "/"
                }
            },
            {
                use: ExtractCssChunks.extract({
                    use: ["css-loader", "sass-loader"]
                }),
                test: /\.(scss|css)$/
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: "url-loader",
                options: {
                    name: "static/fonts/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new ExtractCssChunks({
            filename: "/static/css/[name].css"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            )
        })
    ]
};
