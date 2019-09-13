const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html模版
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//清除打包的文件夹
const webpack = require('webpack');//webpack内置插件
console.log(11)

module.exports={
    mode: "production",//生产模式
    entry:"./src/index.js",//入口
    // entry:{
    //     app:'./src/index.js',
    //     print:'./src/print.js',
    // },
    output:{//出口
        // filename:"bundle.js",
        filename:"[name].bundle.js",
        path:path.resolve(__dirname,'dist'),
    },
    devtool: 'inline-source-map',//source-map 报错跟踪
    devServer:{//提供简单的web服务器  实现:实时加载
        contentBase: './dist',//告诉服务器 在哪查找文件
        hot:true,//热更新
    },
    module:{//模块
        rules:[//匹配文件的规则
            {//解析css文件   css-loader:只负责加载css模块,不会将加载的css样式应用到html  style-loader:负责将css-loader加载到的css样式动态的添加到html-head-style标签中
                test:/\.css$/,
                use:['style-loader', 'css-loader',]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            }
        ]
    },
    //插件
    plugins: [
        new CleanWebpackPlugin(),//清除打包文件
        new webpack.NamedModulesPlugin(),//更容易查看要修补(patch)的依赖包(npm包)
        new webpack.HotModuleReplacementPlugin(),//热更新插件  浏览器不刷新
        new HtmlWebpackPlugin({//生成html模版
               title: 'Output Management'
             })
           ],
}