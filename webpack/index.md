# webpack

Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

它要做的事情是分析项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（scss、typescript等），并将其打包为合适的格式供浏览器使用。

webpack 默认只认js、json的模块，但是在js模块中会引入其他的文件模块，webpack会从入口js文件去分析引用依赖，找到依赖关系将它们转换成浏览器可以识别的文件格式，比如.js .png .css等

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

### Babel处理ES6

Babel是JavaScript编译器，能将es6/7代码转换成es5，让我们在开发过程中放心使用js新特性而不用担心兼容性问题。并且还可以通过插件机制根据需求灵活的扩展。Babel在执行编译的过程中，会从项目根目录下的 `.babelrc` JSON文件中读取配置。没有该文件则会从loader的options读取配置。 

`babel-loader @babel/core @babel/preset-env` babel-loader是webpack与babel的通信桥梁，@babel/core做分析，不会做把es6转成es5的工作，这部分工作需要用到@babel/preset-env来做，它里面包含了es6/7/8转5的转换规则

babel的处理过程：
1. 首先从入口进行分析依赖，AST抽象语法树，
2. 通过语法转换规则来转换代码
3. 最后生成代码

通过这上面的几步还不够，默认的babel只支持let等一些基础的特性转换，Promise等一些特性还没有转换过来，这时需要借助@babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中缺失的新特性。

`按需加载，减少冗余`引用了@babel/polyfill以后装了很多新特性，会导致打包的体积变大，这时需要配置按需加载，用到的注入没用到的不注入来减少打包体积。   

<details>
  <summary>click me</summary>
  <pre>
    <code>
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1'
              },
              corejs: 2, // 新版本需要指定核心库版本
              useBuiltIns: 'usage' // 按需注入 
            }
          ]
        ]
      }
    </code>
  </pre>
</details>

useBuiltIns 是babel 7的新功能，这个选项告诉babel如何配置 @babel/polyfill，它有三个参数可以使用：

1. entry 需要再webpack的入口文件里 import '@babel/polyfill' 引入一次。babel会根据你的使用情况导入垫片，没有使用的功能不会被导入相应的垫片
2. usage 不需要import，全自动检测，但是要安装 @babel/polyfill (试验阶段)
3. false 如果引入了 import '@babel/polyfill'，它不会排除没有使用的垫片，打包体积会很大

### tree Shaking
只支持ES module的引入方式

      optimization:{
        usedExports: true
      }

package.json 设置sideEffects为false，处理摇树的副作用，针对css等文件

      "sideEffects": {
        '*.css'
      } 

### 代码分割 code splitting
把公共库剥离出去，形成一个独立的模块，并且能够在入口文件默认引入进来