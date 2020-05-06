const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/mixin.styl'),
        path.resolve(__dirname, './src/styles/base.styl'),
        path.resolve(__dirname, './src/styles/common.styl')
      ]
    })
}
module.exports = {
  publicPath: './',
  devServer: {
    proxy: 'https://crm-tst.service.leaplearner.com/'
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //     let optimization = {
  //       runtimeChunk: 'single',
  //       splitChunks: {
  //         chunks: 'all',
  //         maxInitialRequests: Infinity,
  //         minSize: 20000,
  //         cacheGroups: {
  //           vendor: {
  //             test: /[\\/]node_modules[\\/]/,
  //             name(module) {
  //               const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
  //               return `npm.${packageName.replace('@', '')}`
  //             }
  //           }
  //         }
  //       },
  //       minimizer: [new UglifyPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             drop_console: true, // console
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'] // 移除console
  //           }
  //         }
  //       })]
  //     }
  //     Object.assign(config, {
  //       optimization
  //     })
  //   } else {
  //     // 为开发环境修改配置...
  //     let optimization = {
  //       runtimeChunk: 'single',
  //       externals: {
  //         'agora-electron-sdk': 'commonjs2 agora-electron-sdk'
  //       },
  //       splitChunks: {
  //         chunks: 'all',
  //         maxInitialRequests: Infinity,
  //         minSize: 20000,
  //         cacheGroups: {
  //           vendor: {
  //             test: /[\\/]node_modules[\\/]/,
  //             name(module) {
  //               const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
  //               return `npm.${packageName.replace('@', '')}`
  //             }
  //           }
  //         }
  //       },
  //       minimizer: [new UglifyPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             drop_console: true, // console
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'] // 移除console
  //           }
  //         }
  //       })]
  //     }
  //     Object.assign(config, {
  //       optimization
  //     })
  //   }
  // },
  configureWebpack: {
    // runtimeChunk: 'single',
    externals: {
      'agora-electron-sdk': 'commonjs2 agora-electron-sdk'
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
    // config.module.rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    config.plugin('compressionPlugin')
      .use(new CompressionPlugin({
        test: /\.js$|\.html$|.\css/,
        threshold: 10240,
        deleteOriginalAssets: false
      }))
    if (process.env.use_analyze) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false
  }
}
