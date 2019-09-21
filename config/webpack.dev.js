 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 //开发环境配置   merge合并webpack
 module.exports = merge(common, {
   mode:"development",
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
     publicPath:"/",
     stats:"errors-only",//打印信息
     port: 8080,//端口号
     host: "10.112.113.143",//ip
     open: true,//默认打开浏览器
     proxy:{//代理
        "/api":{
          target:"https://cr-api-uat.xuantong.cn",
          pathRewrite: {"^/api" : ""},
          secure: false,//接受https
        }
     }

   }
 });