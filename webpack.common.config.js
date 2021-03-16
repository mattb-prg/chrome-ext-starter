const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require("webpack");

module.exports = {
    entry: {
        background: "./src/ext/background/index.ts",
        'js/content': "./src/ext/content-scripts/index.ts",
        'js/popup': "./src/ext/popup/index.ts"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        mainFields: ["main", "module"]
    },

    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new CopyWebpackPlugin([
            { from: 'src/ext/html', to: 'html' },
        ])
    ]
};
