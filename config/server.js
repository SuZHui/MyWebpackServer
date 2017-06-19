const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const path = require('path')
const webpackConf = require('./webpack.config.js')

var app = express()
var compiler = webpack(webpackConf)

// 添加webpack服务中间件
app.use(webpackMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    quiet: true
}));
// 添加webpack 热更新中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
app.use(hotMiddleware)
// 添加html热更新
compiler.plugin('compilation', function (compilation){
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb){
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})


var staticPath = '/static' //path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


app.listen(3100);