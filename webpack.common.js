 const path = require('path');

 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");//将css抽离出去
 //  const ExtractTextPlugin = require("extract-text-webpack-plugin");//将css分离出去 弃用
 const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader 插件，它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块

 //webpack公用配置
 module.exports = {
     entry: {
         //  app: './src/index.js'
         app: './src/main.js',
     },
     output: {
         filename: 'js/[name].[chunkhash].js',
         path: path.resolve(__dirname, 'dist')
     },
     module: { //模块
         rules: [ //匹配文件的规则
             { //解析css文件   css-loader:只负责加载css模块,不会将加载的css样式应用到html  style-loader:负责将css-loader加载到的css样式动态的添加到html-head-style标签中
                 test: /\.css$/,
                //  use: ['style-loader', 'css-loader', ]
                use:[ MiniCssExtractPlugin.loader,'css-loader']//抽离css
             },
             {
                 test: /\.(png|svg|jpg|gif)$/,
                 use: [
                     {
                         loader:"file-loader",
                         options:{
                             name:"images/[name].[hash].[ext]"
                         }
                     },
            //         {
            //             loader:"url-loader",
            //             options:{
            //                 limit:10000,//限制打包图片的大小
            //                 name:"images/[name]-[hash:8].[ext]",//打包后图片放的文件夹
            //                 //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
            // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名
            //             }
            //         }
          
                    ]
             },
            //解析vue
             {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            //js文件转es5
            {
                test: /\.js$/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                     presets: ['es2015']
                  }
                }],
                exclude: /node_modules/
              }
         ]
     },
     plugins: [
         new HtmlWebpackPlugin({
             template:"./public/index.html"
         }),
         new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "style/[name].[chunkhash].css",
            chunkFilename: "[id].css"
          }),
          new VueLoaderPlugin()
        //  new webpack.optimize.CommonsChunkPlugin({ //抽离公用路径  已经弃用
        //      name: 'common' // 指定公共 bundle 的名称。
        //  })
     ],
     optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons", // 指定公共 bundle 的名称。
                    chunks: "initial",//chunks 有三个可选值，”initial”, “async” 和 “all”. 分别对应优化时只选择初始的chunks，所需要的chunks 还是所有chunks 。
                    minChunks: 2,//minChunks 是split前，有共享模块的chunks的最小数目 ，默认值是1， 但我看示例里的代码在default里把它重写成2了，从常理上讲，minChunks = 2 应该是一个比较合理的选择吧。
                }
            }
        }
    },
 };