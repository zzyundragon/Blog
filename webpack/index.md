# webpack

webpack是一个打包模块化JavaScript的工具，它会从入口模块出发，识别出源码中的模块化导入语句，递归地找出入口文件的所有依赖，将入口和其所有的依赖打包到一个单独的文件中去。

它要做的事情是分析项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（scss、typescript等），并将其打包为合适的格式供浏览器使用。

webpack 默认只认js、json的模块，但是在js模块中会引入其他的文件模块，webpack会从入口js文件去分析引用依赖，找到依赖关系将它们转换成浏览器可以识别的文件格式，比如.js .png .css等

webpack不适合用于JavaScript库的构建，因为不够纯粹

## webpack配置文件

<pre>
  <code>
    const path = require('path')
    module.exports = {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'), // path 必须是个绝对路径
        filename: 'my-first-webpack.bundle.js'
      },
      mode: 'production' // 打包环境
    }
  </code>
</pre>

当使用 `npx webpack` ，表示使用webpack处理打包`./src/index.js`的入口模块，默认放在当前目录下的`dist`目录，打包后的模块名称是`main.js`，当然我们也可以修改。

webpack有默认的的配置文件`webpack.config.js`，可以对这个文件进行修改，进行个性化的配置

- 默认的配置文件：webpack.config.js
  
  `npx webpack // 执行命令后，webpack会找到默认的配置文件，并使用执行`
- 不适用默认的配置文件：比如自定义配置文件webpackconfig.js

  `npx webpack --config webpackconfig.js // 指定webpack使用webpackconfig.js文件来作为配置文件来执行`

## webpack核心概念

### entry

单页面入口时可以是字符串，多页面入口时也可以是个对象
<details>
  <summary>click me</summary>
  <pre>
    <code>
      // 单入口 spa 字符串
      entry: 'src/index.js'
      // 相当于
      entry: {
        main: 'src/index.js'
      }
      // 多入口 entry是个对象
      entry: {
        index: './src/index.js',
        login: './src/login.js'
      }
    </code>
  </pre>
</details>

### output
打包转换后的文件输出位置，在webpack经过一系列处理并得出最终想要的代码后输出结果。

path：必须是绝对路径
filename：可以写死，也可以是占位符，显示entry中的key值，可增加 chunkhash:num

> 三种hash占位符有什么区别？
- hash
- chunkhash
- contenthash 

hash占位符，所有输出文件的hash值都是一样的，其中一个文件发生改动后，hash值将重新改变，即整个项目文件的缓存都将失效。

chunkhash，每一个输出文件都有自己的hash值，webpack会进行自动识别内容是否发生更改，未改变的文件hash值不变，缓存可继续使用，改变了的文件重新生成hash值。


<details>
  <summary>click me</summary>
  <pre>
    <code>
      const path = require('path')
      module.exports = {
        entry: {
          index: './src/index.js',
          login: './src/login.js'
        },
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: '[name]_[hash].js' // '[name]_[chunkhash:8].js'
        },
        mode: 'development'
      }
    </code>
  </pre>
</details>

### mode
用来指定当前的构建环境

- production
- development
- none

设置mode可以自动触发webpack内置的函数，达到优化的效果

| 选项 | 描述 |
| --- | --- |
| development | 会将 definePlugin 中的 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NameModulesPlugin。有利于开发调试，热更新的处理，识别哪个模块的变化，打印出来 |
| production | 会将 definePlugin 的 process.env.NODE_ENV 的值设置为 production。启用一些生产插件来帮助模块压缩，处理副作用等一些功能|

### module

处理模块

### loader

loader 是有执行顺序的，自右往左

### plugins

plugin可以在webpack运行到某个阶段的时候，帮你做一些事情，类似生命周期的概念

扩展概念，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或其他想做的事情

作用于整个构建过程

- htmlWebpackPlugin

  htmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到html中

- clean-webpack-plugin
  
  每次构建前自动删除dist目录，避免生成冗余文件

- mini-css-extract-plugin

  将css文件提取为一个文件  

### sourceMap

源代码与打包后的代码的映射关系，通过sourceMap定位到源代码。

在dev模式中，默认开启；关闭的话可以再配置文件里设置 `devtool: "none"`

### WebpackDevServer

提升开发效率的利器，每次改完代码都需要重新打包一次，打开浏览器刷新一次很麻烦。可以通过 `webpack-dev-server` 来改善。

dist目录里面没有文件了，文件被保存在了内存当中，访问速度变快。

- 跨域 proxy
- mock数据

### Hot Webpack Replacement(HMR:热模块替换)

只模块刷新

js模块HMR，需要手动监听需要HRM的模块，当该模块的内容发生改变的时候回触发回调
