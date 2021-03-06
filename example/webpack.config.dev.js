/**
 * @module webpack.config.dev
 * @description webpack 开发环境配置环境项
 * @author wing
 */
const path = require('path');
const webpack = require('webpack');

const base = require('./webpack.config.base')();


module.exports = function() {
    return Object.assign({}, base, {
        devtool: 'cheap-module-eval-source-map',
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:9001',
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'js/index.js')
        ],
        output: {
            path: path.resolve(__dirname, 'dist/assets/js'),
            filename: 'app.bundle.js',
            chunkFilename: '[id].[chunkhash].js',
            publicPath: '/webpack/'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]
    })
}