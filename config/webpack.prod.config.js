var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var userOption = require('./user.option.js')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/js/index.js',
    },
    output: {
        publicPath: userOption.outputResource,
        filename: 'js/[name].js',
        path: userOption.build.outputRoot
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [resolve('src')],
            use: {
                loader: 'babel-loader'
            }             
        },{
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']  
            })
        }]
    },
    devtool: '#source-map',
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            template: './src/index.html',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin({
            filename: '/css/[name].css',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: userOption.build.outputRoot,
                ignore: ['.*']
            }
        ]),
        new FriendlyErrorsPlugin()
    ]
}