# leaplearner-electron

## electron
可参考：https://electronjs.org/docs
## view-design
可参考：https://www.iviewui.com/docs/introduce

## 概况

基于electron结合@vue/cli3生成的跨平台桌面应用，使用webpack4.x打包构建。Node版本定为10.15.3，electron为5.0.8。包依赖管理器建议使用yarn，速度快且稳定，生成的lock文件便于管理依赖包版本。

## 项目目录结构

```
.
├── build
├── config
├── dist 
├── log
├── server
├── src 
│   ├── assets
│   ├── components
│   ├── pages
│   ├── router
│   ├── store
│   ├── App.vue
│   └── main.js
├── static
├── app.js
├── index.html
├── README.md
└── package.json

```

## 开发

### ESLint

开发过程中将默认开启ESLint。

ESLint检查规则使用**JavaScript Standard Style**，请**务必**遵循此规范书写。

详细细则请参见:[JavaScript Standard Style](https://standardjs.com/rules-zhcn.html#javascript-standard-style)

Tips: 如需在某段代码片段内跳过ESlint检查(这种情况是可能存在的，比如定义了一些以后会用到但现在暂时不会被使用的常/变量,或者在debug时加入了一些迷之代码)，需要在代码片段加入如下注释:

```js
/* eslint-disabled no-some-rule */
...
code
...
```
例如：未使用的常/变量 
```js
/* eslint-disabled no-unused-vars */   
const PI = Math.PI //unused var

...
code
...

```
### 文件命名规范

#### 组件命名：

组件应按用途放入相应目录。

此处将组件分类两类：

1. 页面组件：在router定义中使用的组件。
2. 普通组件：在页面组件中使用的其他公共组件。

页面组件放入`src/pages`目录中。
普通组件放入`src/components`目录中。

需要将每个组件新建立目录，并将组件放入该目录中，目录名命名为组件名，文件夹内部的组件命名为`Index.vue`

* 组件目录名与组件文件名**首字母大写**
* 组件实行**就近维护**原则，请将**与该组件相关的资源放到组件目录中，并按照文件类型建立子目录**。

eg:

![](http://webstatic5.91wutong.com/doc/img/dic.jpg)

#### 注释：

每个人开发组建时都需要为开发的组件书写注释，以便后续维护。

格式：
```js
/**
 * header
 * @author Zhichao.Liu
 * @type component
 * @module components/Header
 * @desc common header
 * @param {object} [seller] seller对象
 *
 * @example
 * <v-header :seller="seller"></v-header>
 */
```

### CSS 管理

管理 CSS 的推荐方法是简单地使用 `*.vue` 单个文件组件内的 `<style>`，它提供：

- 与 HTML 并列同级，组件作用域 CSS
- 能够使用预处理器(pre-processor)或 PostCSS
- 开发过程中热重载(hot-reload)

#### stylus

stylus与sass，less一样，均为css扩展语言。

具体使用方法请参见：[stylus中文文档](http://www.zhangxinxu.com/jq/stylus/)

在utils文件下，有关于日常开发所需的样式类封装，比如flex，position等已在全局引用，使用时在dom元素的className中添加相关的类名即可。

### wtNetwork(待讨论)

在store内对ajax进行了二次封装，名为`wtNetwork`。

store用于组件的状态共享，因此store的内容在各个组件内均可访问到，将一些公共状态或者方法放置在store中是一个不错的选择。

**建议先学习vuex相关内容。**

用法：

导入`mapActions`

```js
import {mapActions} from 'vuex'
```

引用`wtNetwork`

```js
...
methods: {
    someMethod () {
        //code
    },
    ...mapActions(['wtNetwork'])
}
...   
```
使用`wtNetwork`

```js
/* promise */
this.wtNetwork({
    tag: 'GET_SOMETHING',
    url: 'http://api.example.com/v1/index',
    type: 'GET'
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

/* async await */
...
methods: {
    async postData () {
        let params = {
            tag: 'POST_SOMETHING',
            url: 'http://api.example.com/v1/index',
            type: 'POST',
            data: {a:1,b:2},
            //序列化数据 qs.stringify({a:1,b:2})
            headers: {'Content-Type': 'application/json'}
        }
        try {
            let {data} = await this.wtNetwork(params)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    },
    ...mapActions(['wtNetwork'])
}
...
```
`tag`:用于标识请求，防止重复发送相同的请求，tag在请求完成(成功、失败)后被释放。

`url`:请求的URL

`type`:请求类型。默认值： `GET`

    type的可用值:
        GET
        POST
        PostMultipart
        PUT
        PATCH
        DELETE
        
`data`: 需要发送的数据(json，或者是序列化的数据)。默认值: `{}`

`headers`: 默认值: `{}`

**例子中的`this`指的是`vue实例`，因为它是在vue组件中被引用的。**

## 打包

### 为生产环境打包时,将静态资源路径替换为CDN域名

修改`config/index.js`中`build/assetsPublicPath`的值为CDN的域名后，打包后的文件对静态资源的引用会自动替换完成。后期完善config目录后，考虑将`assetsPublicPath`配置放入config中，之后使用`webpack-merge`将次配置合并到webpack打包配置文件中。
### 组件懒加载

使用懒加载可以按需加载需要的组件，这势必会减少文件的加载，加快页面载入的速度。

#### 使用vue-router定义前端路由时，使用懒加载引用组件

引用组件的写法：

```js
const Index = () => import('@/pages/Index');
...
```

#### 将组件分为多个chunk

默认情况下会将所有的组件打包为一个文件，组件会全部下载，只是因为使用懒加载而暂时未被使用。按需将组件拆分为多个chunk，在使用到该组件时在从服务器下载需要的chunk不失为解决这个问题的好方法。

将组件拆分为不同的chunk:

```js
const Index = () => import(/* webpackChunkName: "index" */'@/pages/Index');
const Goods = () => import(/* webpackChunkName: "goods" */'@/pages/goods/Goods');
const Ratings = () => import(/* webpackChunkName: "ratings" */'@/pages/ratings/Ratings');
const Seller = () => import(/* webpackChunkName: "seller" */'@/pages/seller/Seller');
```

这仍是上面懒加载组件的写法，只是多个一个神奇的注释`/* webpackChunkName: "chunkname" */`在其中，这里为webpack中Code Splitting(代码分割)内容。

打包后这四个组件便是四个不同的文件了，他们会按需异步加载。

### vendor

默认情况下，webpack会将`node_module`下使用的模块按引用情况打包在vendor.js中，但是如果不做任何修改的直接打包的话，存在两个问题：

1、引用多次的模块(库)会被重复打包在引用该模块的chunk中，导致打包后的chunk体积变大。
2、仅会生成一个vendor.js，当引用的模块过多时，vendor.js体积变大。

最终产出的文件会引用vendor.js，因为这是项目正常运行所需要的模块，他会在打开页面时被加载。vendor.js体积过大会影响首屏展示的时间。因此这两点为需要解决的问题。

#### 解决模块重复打包

需要在webpack配置文件中手动维护vendor列表。

具体操作为：

在`build/webpack.base.conf.js`中找到`entry`，在对象中加入字段:`'vendor'`

```js
entry: {
    app: './src/main.js',
    //add vendor
    vendor: ['module1', 'module2', '...']
}
```

webpack打包时发现vendor列表中的模块与要打包的模块匹配时，会将该模块打包到vendor.js,且只会打包一次，其他组件对该模块的引用都会指向vendor中。

#### 拆分vendor

手动维护多个vendor列表，打包时,会将不同vendor列表中的模块打包为不同的vendor。

需要修改以下文件：

`build/webpack.base.conf.js`

```js
entry: {
    app: './src/main.js',
    //add vendor
    vendor_chunk1: ['module1', 'module2'],
    vendor_chunk2: ['module3', 'module4'],
    ...
    vendor_chunkN: ['moduleN']
}
```   

`build/webpack.prod.conf.js`

```js
new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor_chunkN', ... , 'vendor_chunk2', 'vendor_chunk1']
}),

new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor_chunkN', ... , 'vendor_chunk2', 'vendor_chunk1']
})
```





