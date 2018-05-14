'use strict'
const path = require('path')
const webpack = require("webpack")
const vuxLoader = require('vux-loader')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const globalApi = require('./api')
const vConsolePlugin = require('vconsole-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let baseConfig = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath: process.env.NODE_ENV === "production" ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "~": resolve("src/components"),
            assets: resolve("src/assets")
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory",
                include: [resolve("src"), resolve("test")]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(globalApi),
        // new vConsolePlugin({
        //     enable: process.env.NODE_ENV === "production"
        // }) // 发布代码前记得删除
    ]
};

module.exports = vuxLoader.merge(baseConfig, {
    plugins: ["vux-ui", "progress-bar", "duplicate-style", {
        name: 'less-theme',
        path: resolve('src/assets/css/theme.less')
    }]
})