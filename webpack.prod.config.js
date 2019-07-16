const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
})
