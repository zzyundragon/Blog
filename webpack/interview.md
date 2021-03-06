## 什么是webpack

Webpack 是一个打包模块化 JavaScript 的工具，专注于构建模块化项目。webpack从入口文件开始分析项目的引用依赖，找到依赖关系将它们转换成浏览器可以识别的文件格式，比如.js/.png/.css等。

在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。

## webpack的核心概念

- **Entry**：入口，webpack执行构建的第一步将从 Entry 开始，单页面入口时可以是字符串，多页面入口时也可以是个对象
- **Output**：输出结果，指示了webpack如何去输出，以及输出在哪里
- **Loader**：模块转换器，webpack默认只认识JavaScript和JSON文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被分析添加到依赖图中。 
- **Plugin**：扩展插件，loader 用于转换其他类型的模块，而插件则可以用于执行范围更广的任务。包括打包优化、资源管理、注入环境变量等。在webpack执行流程中的特定时机注入扩展逻辑来改变构建结果或其他想要做的处理。
- **Module**：模块，webpack中一切皆模块，一个模块对应一个文件。webpack 会从入口文件中递归找出所有依赖的模块。
- **Chunk**： 代码块，指webpack在进行模块的依赖分析是，代码分割出来的代码块。一个 chunk 由多个模块组合而成，用于代码合并与分割。

## webpack的构建流程

Webpack启动后会从 Entry 里配置的入口文件开始递归解析依赖的所有模块 Module。没找到一个 Module，就会根据配置的 loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些 Module 会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。

webpack的运行过程是一个串行的过程，从启动到结束会一次执行以下的流程：
1. 初始化参数：从配置文件到shell语句中读取合并参数，得出最终参数；
2. 开始编译：参数初始化 Compiler 对象，加载所有配置的 Plugin，执行对象的run方法开始执行编译；
3. 确定入口：根据配置中的 Entry 找到所有入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，递归本步骤直到所有入口依赖的文件都得到编译处理；
5. 完成编译模块：模块编译完成，得到编译模块以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表；
7. 输出完成：根据配置确定输出的路径和文件名，把文件内容写进文件系统。

在webpack构建过程中，webpack会在特定的时间点广播出特定的事件，Plugin在监听到对应的事件后会执行特定的逻辑，并且Plugin可以调用Webpack提供的API改变webpack的运行结果。

## 常见的loader和plugin有哪些，它们解决了什么问题

常用Loader：
- 加载文件：
  - file-loader：把文件输出到一个文件夹里，在代码中通过相对URL去引用输出文件，比如图片，字体图标、cdn等
  - url-loader：可以把文件的内容经过 base64 编码后注入到 JavaScript 或者 css 中去，以减少http请求
  - image-loader：加载并压缩图片文件
  - node-loader：加载node.js原生模块 .node 文件
- 转换脚本语言：
  - css-loader：加载css，支持模块化、压缩、文件导入等特性
  - style-loader：把css代码注入到JavaScript中，通过DOM操作去加载css
  - postcss-loader：扩展css语法，使用css3
  - sass-loader、less-loader、stylus-loader
- 检查代码：
  - eslint-loader
  - tslint-loader
- 框架配置
  - vue-loader：加载vue.js单文件组件
  - i18n-loader：加载多语言版本，支持国际化
  - ignore-loader：忽略掉部分文件

常用的plugin：
- 构建：
  - htmlWebpackPlugin：构建结束后自动生成一个html文件，并把生成的js模块引入到html中
  - clean-webpack-plugin：每次构建前自动删除dist目录，避免生成冗余文件
  - mini-css-extract-plugin：将css文件提取为一个文件
- 优化：
  - uglifyjs-webpack-plugin：通过UglifyEs压缩es6代码
  - hot-module-replacement-plugin：开启模块热替换功能
## 什么是模块热更新，它的原理是什么

代码改动实时预览，DevServer 除了自动刷新整个网页外，还支持模块热更新技术，在不刷新整个网页的情况下，当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。实时预览反应更快，等待时间更短。

`原理`：在要开发的网页中注入一个代理客户端用于连接DevServer和网页

## 如何配置单页应用，如何配置多页应用
## 如何提高webpack的构建速度
## 如何利用webpack来优化前端性能（提高性能和体验）
## npm打包时需要注意哪些，如何利用webpack来更好的构建
## 如何在vue项目中实现按需加载
## webpack-dev-server和http服务器、nginx有什么区别
## webpack与grunt、gulp的不同