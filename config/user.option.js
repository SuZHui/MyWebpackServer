var path = require('path')
module.exports = {
    build: {
        env: "production",
        outputRoot: path.resolve(__dirname, '../dist'),     //输入根路径
        outputResource: 'static'    //输出的css、js存放路径
    },
    dev: {
        env: "development",
        port: 3100
    }
}