var express = require('express')
var webpack = require('webpack')
var webpackMiddleware = require('webpack-dev-middleware')
var proxyMiddleware = require('http-proxy-middleware')
var path = require('path')
var webpackConf = require('./webpack.config.js')

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
// 添加api代理
var proxyTable = {}
Object.keys(proxyTable).forEach(function(name){
    var options = proxyTable[name]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || name, options))
})
// h5 history api 支持
app.use(require('connect-history-api-fallback')())

var staticPath = '/static' //path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


app.listen(3100);