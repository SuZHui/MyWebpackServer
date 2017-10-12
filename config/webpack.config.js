var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: ['./config/dev-client.js', './src/js/index.tsx'],
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [resolve('src')],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 
                    {   
                        // react模块化css配置
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: "[name]-[local]-[hash:base64:5]"
                        }
                    }, 
                    'postcss-loader', 
                    'sass-loader'
                ]
            }
            ,{
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
            },{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    externals: {
        'React': 'react',
        'ReactDOM': 'react-dom'
    },
    resolve: {
        extensions: ['.scss', '.ts', '.tsx', '.js', '.json', '.web.jsx', '.jsx'],
    },
    //devtool: '#cheap-module-eval-source-map',
    devtool: "source-map",
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