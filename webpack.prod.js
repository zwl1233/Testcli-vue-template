 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const webpack = require('webpack');
 const {
   CleanWebpackPlugin
} = require('clean-webpack-plugin');
 

 //生产环境  
 //生产环境调试时建议使用source-map
 module.exports = merge(common, {
    devtool: 'source-map',
   plugins: [
      new CleanWebpackPlugin(),//清除打包文件
     new UglifyJSPlugin({
        sourceMap: true,//压缩代码之后也能找到错误
     }),//压缩代码  去除没有使用的引用
     new webpack.DefinePlugin({//定义环境变量  无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"
               'process.env.NODE_ENV': JSON.stringify('production')
            })
   ]
 })