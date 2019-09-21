const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const host="127.0.0.1"
const port='8080'
//开发环境配置   merge合并webpack
module.exports = merge(common, {
  mode:"development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    publicPath:"/",
    stats:"errors-only",//打印信息
    quiet: true, // 如果使用webpack-dev-server，需要设为true，禁止显示devServer的console信息
    port: port,//端口号
    host: host,//ip
    open: true,//默认打开浏览器
    proxy:{//代理
       "/api":{
         target:"https://cr-api-uat.xuantong.cn",
         pathRewrite: {"^/api" : ""},
         secure: false,//接受https
       }
    }

  },
  plugins:[
   new FriendlyErrorsWebpackPlugin({
     compilationSuccessInfo: {
         messages: [`Your application is running here: http://${host}:${port}`],
     },
     onErrors: (severity, errors) => {
       if (severity !== 'error') {
         return;
       }
       const error = errors[0];
       notifier.notify({
         title: "Webpack error",
         message: severity + ': ' + error.name,
         subtitle: error.file || '',
         icon: ICON
       })
     },
     clearConsole: true,
   })
  ]
});