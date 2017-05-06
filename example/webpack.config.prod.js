/**
 * @module webpack.config.prod
 * @description webpack 生产环境配置环境项
 * @author wing
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config.base')();


module.exports = function() {
    return Object.assign({}, base, {
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            new HtmlWebpackPlugin({
                title: 'Mock server',
                template: 'handlebars-loader!./src/index.hbs',
                filename: path.resolve(__dirname, './dist/index.html'),
            })
        ]
    })
}