const common = require('./webpack.common.config')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
})
