 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 //开发环境配置   merge合并webpack
 module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist'
   }
 });