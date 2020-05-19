## 什么是webpack

Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

webpack 默认只认识 js、json 的模块，但是在js模块中会引入其他的文件模块，webpack 会从入口js文件去分析引用依赖，找到依赖关系将它们转换成浏览器可以识别的文件格式，比如.js .png .css等

## webpack的核心概念

- **Entry**：入口，webpack执行构建的第一步将从 Entry 开始，单页面入口时可以是字符串，多页面入口时也可以是个对象
- **Output**：输出结果，指示了webpack如何去输出，以及输出在哪里
- **Loader**：模块转换器，webpack默认只认识JavaScript和JSON文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。 
- **Plugin**：扩展插件，loader 用于转换其他类型的模块，而插件则可以用于执行范围更广的任务。包括打包优化、资源管理、注入环境变量等。在webpack执行流程中的特定时机注入扩展逻辑来改变构建结果或其他想要做的处理。
- **Module**：模块，webpack中一切皆模块，一个模块对应一个文件。webpack 会从入口文件中递归找出所有依赖的模块。
- **Chunk**： 代码块，一个 chunk 由多个模块组合而成，用于代码合并与分割。

## webpack的构建流程

Webpack启动后会从 Entry 里配置的入口文件开始递归解析依赖的所有模块 Module。没找到一个 Module，就会根据配置的 loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些 Module 会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。

## 常见的loader和plugin有哪些，它们解决了什么问题
## 什么是模块热更新，它的原理是什么
## 如何配置单页应用，如何配置多页应用
## 如何提高webpack的构建速度
## 如何利用webpack来优化前端性能（提高性能和体验）
## npm打包时需要注意哪些，如何利用webpack来更好的构建
## 如何在vue项目中实现按需加载
## webpack-dev-server和http服务器、nginx有什么区别
## webpack与grunt、gulp的不同