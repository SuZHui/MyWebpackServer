var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
console.log(resolve('src'))
module.exports = {
    entry: ['./config/dev-client.js', './src/js/index.js'],
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [resolve('src')]
        },{
            test: /\.(css|scss)$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }]
    },
    resolve: {
        alias: {
            '@': resolve('src') //组件引入的快捷方式
        },
        extensions:['.js', '.json', '.jsx', '.scss', '.css']
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
}