const path = require('path');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  // publicPath: "./" ,
  // lintOnSave: false,
  // productionSourceMap: false,
  // css: {
  //   sourceMap: false
  // },
  devServer: {
    disableHostCheck: true,
    //上面这种即可
    proxy: {
      "/api": {
        target: "http://localhost:3000",//接口的地址
        ws:true,
        changeOrigin: true,
        pathRewrite: {
          '^/api':""
        }
      },

    },
  },
  // pages: {
  //   index: {
  //     // add here ---start---
  //     entry: ['node_modules/babel-polyfill/dist/polyfill.js', 'src/main.js'],
  //     // add here ---end---
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index'],
  //   },
  // },  
  // chainWebpack: config => {
  //   config.entry('main').add('babel-polyfill')
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     .set('@a', resolve('src/assets'))
  //     .set('@c', resolve('src/components'))
  //     .set('@v', resolve('src/views'))
  // },
  // transpileDependencies: ['bootstrap'],
  // configureWebpack:config => {
  //   config.entry.app = ["babel-polyfill","./src/main.js"]              
  // }  

  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     return {
  //       plugins: pluginList
  //     };
  //   }
  // }
};