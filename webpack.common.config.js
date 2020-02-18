const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require("webpack");

module.exports = {
    entry: {
        background: "./src/ext/background/index.ts",
        content: "./src/ext/content-scripts/index.ts",
        popup: "./src/ext/popup/index.ts"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        mainFields: ["main", "module"]
    },

    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }),
        new CopyWebpackPlugin([
            { from: 'src/html', to: '../html' },
            { from: 'src/css', to: '../css' },
            { from: 'src/manifest.json', to: '../' },
        ])
    ]
};
