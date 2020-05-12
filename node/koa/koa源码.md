# Koa

- 创建上下文对象Context，封装了request和response
- 使用中间件

首先node创建一个简单的web服务应用是通过http模块来完成的
<details>
   <summary>show me code</summary>
   <pre>
    <code>
        const http = require('http')
        const fs = require('fs')
        const app = http.createServer((request, response) => {
            let { url, method, headers } = request
            if (url === '/' && method === 'GET') {
                fs.readFile('./index.html', (err, data) => {
                    if (err) {
                        response.statusCode = '500'
                        response.end('network error')
                    }
                    response.statusCode = '200'
                    response.setHeader('content-type', 'text/html')
                    response.end(data)
                })
            } else if (url === '/users' && method === 'GET') {
                let data = [{ name: 'jerry' }]
                response.statusCode = '200'
                response.setHeader('content-type', 'application/json')
                response.end(JSON.stringify(data))
            } else if (method === 'GET' && headers.accept.indexOf('image/*') > -1) {
                fs.createReadStream('.' + url).pipe(response)
            } else if (method === 'GET' && headers.accept.indexOf('text/css') > -1) {
                fs.createReadStream('.' + url).pipe(response)
            } else {
                response.statusCode = '404'
                response.end('404')
            }
            // response.end('hello node')
        })
        app.listen('3000', () => {
            console.log('app listen 3000')
        })
    </code>
</pre> 
</details>

> 模仿实现一个vue-cli，发布npm，vue路由约定

使用 `koa` 来创建http服务

<details>
   <summary>show me code</summary>
   <pre>
    <code>
        const Koa = require('koa')
        const app = new Koa()
        app.use((ctx,next) => {
            ctx.body = [
                {
                    name: 'jerry'
                }
            ]
            next()
        })
        app.use((ctx,next) => {
            console.log(ctx.url)
            next()
        })
        app.listen('3000', () => {
            console.log('app listen 3000')
        })
    </code>
</pre> 
</details>

可以发现使用koa，不见了request和response取而代之的是ctx和next。ctx对象做了原来request和response对象做的事情，next又是做什么的？其实koa封装了http的request和response对象，构成了上下文对象ctx；使用中间件来完成对业务逻辑的切面描述，use内部是为中间件，next()表示执行下一个中间件。

可以先来简单搭建一个 `imKoa` 对象

<details>
   <summary>imKoa.js</summary>
   <pre>
    <code>
       const http = require('http')
       class ImKoa {
           use(callback) {
               this.callback = callback
           }
           listen(...args) {
               const server = http.createServer((req, res) => {
                   this.callback(req, res)
               })
               server.listen(...args)
           }
       }
       module.exports = ImKoa
    </code>
</pre> 
</details>


<details>
   <summary>app.js</summary>
   <pre>
    <code>
       const ImKoa = require('./imKoa.js')
       const app = new ImKoa()
       app.use((req, res) => {
           res.writeHead('200')
           res.end('hi jerry')
       })
       app.listen('3000', () => {
           console.log('app listen 3000')
       })
    </code>
</pre> 
</details>

架子搭好了，然后开始封装request和response对象。context上下文对象，将原始请求对象request和响应对象response封装并挂载到context上，并且在context上设置setter和getter，从而简化操作。

> 需提前学习 Object.defineProperty()   Object.create()

<details>
   <summary>request.js</summary>
   <pre>
    <code>
        module.exports = {
            get url() {
                return this.request.url
            },
            get method() {
                return this.request.methods.toLowerCase()
            }
        }
    </code>
</pre> 
</details>


<details>
   <summary>response.js</summary>
   <pre>
    <code>
        module.exports = {
            get body() {
                return this._body
            },
            set body(val) {
                this._body = val
            }
        }
    </code>
</pre> 
</details>


<details>
   <summary>context.js</summary>
   <pre>
    <code>
        module.exports = {
            set body(val) {
                this.res.body = val
            },
            get body() {
                return this.res.body
            },
            get method() {
                return this.req.method
            },
            get url() {
                return this.req.url
            }
        }
    </code>
</pre> 
</details>

<details>
   <summary>imKoa.js</summary>
   <pre>
    <code>
       const http = require('http')
       const context = require('./context')
       const request = require('./request')
       const response = require('./response')
       class ImKoa {
           use(callback) {
               this.callback = callback
           }
           listen(...args) {
               const server = http.createServer((req, res) => {
                   // this.callback(req, res)
                   let ctx = this.createContext(req, res)
                   this.callback(ctx)
                   res.end(ctx.body)
               })
               server.listen(...args)
           }
           createContext(req, res) {
                const ctx = Object.create(context)
                ctx.request = Object.create(request)
                ctx.response = Object.create(response)
                ctx.req = ctx.request.req = req
                ctx.res = ctx.response.res = res
                return ctx
            }
       }
       module.exports = ImKoa
    </code>
</pre> 
</details>

<details>
   <summary>app.js</summary>
   <pre>
    <code>
       const ImKoa = require('./imKoa.js')
       const app = new ImKoa()
       app.use((ctx, next) => {
           console.log(ctx.url, ctx.method)
           ctx.body = [
               {
                   'text': 'hello'
               }
           ]
       })
       app.listen('3000', () => {
           console.log('app listen 3000')
       })
    </code>
</pre> 
</details>

封装到这里只能执行一个中间件，如果多个中间件该如何封装？首先了解下什么是koa的中间件，中间件是个函数组合的概念，将一组需要顺序执行的函数复合为一个函数。外层函数的参数实际是内层函数的返回值。

<details>
   <summary>函数组合</summary>
   <pre>
    <code>
        const add = (x, y) => x + y
        const square = z => z * z
        console.log(square(add(1, 2))) // 9 外层函数的参数实际是内层函数的返回值
        // 将两个函数封装
        const compose = (fn1, fn2) = (...args) => fn2(fn1(...args))
        const fn = compose(add, square)
        console.log(fn(1, 2)) // 9
        // 如果需要封装的函数为不确定的多个时
        const compose = (...[first, ...other]) => (...args) => {
            let ret = first(...args)
            other.forEach(fn => {
                ret = fn(ret)
            })
            return ret
        }
        const fn = compose(add, square, square)
        console.log(fn(1, 2)) // 81
    </code>
</pre> 
</details>

函数组合，多个函数顺序执行通过递归调用完成，而next后面需要跟个异步函数，异步执行这时需要再加点料 promise , 先行复习Promise相关知识。

<details>
   <summary>函数组合异步调用</summary>
   <pre>
    <code>
        const fn1 = async (next) => {
            console.log('fn1')
            await next()
            console.log('fn1 end')
        }
        const fn2 = async (next) => {
            console.log('fn2')
            await next()
            console.log('fn2 end')
        }
        const fn3 = async (next) => {
            console.log('fn3')
            await next()
            console.log('fn3 end')
        }
        const middlewares = [fn1, fn2, fn3]
        const fn = compose(middlewares)
        console.log(fn())
        // 函数式组合异步调用
        function compose(middlewares) {
            return function() {
                return dispatch(0)
                function dispatch(i){
                    let fn = middlewares[i]
                    if (!fn) return Promise.resolve()
                    return Promise.resolve(
                        fn(function next() {
                            return dispatch(i + 1)
                        })
                    )
                }
            }
        }
    </code>
</pre> 
</details>

函数式组合完成异步调用后，完善 imkoa.js 便可以使用多个use中间件完成业务逻辑的切面描述。责任链模式

<details>
   <summary>imKoa.js</summary>
   <pre>
    <code>
       const http = require('http')
       const context = require('./context')
       const request = require('./request')
       const response = require('./response')
       class ImKoa {
           constructor() {
               this.middlewares = []
           }
           use(callback) {
               this.middlewares.push(callback)
           }
           listen(...args) {
               const server = http.createServer(async (req, res) => {
                   let ctx = this.createContext(req, res)
                   let fn = this.compose(this.middlewares)
                   await fn(ctx)
                   res.end(ctx.body)
               })
               server.listen(...args)
           }
           createContext(req, res) {
                const ctx = Object.create(context)
                ctx.request = Object.create(request)
                ctx.response = Object.create(response)
                ctx.req = ctx.request.req = req
                ctx.res = ctx.response.res = res
                return ctx
            }
            compose(middlewares) {
                return function(ctx) {
                    return dispatch(0)
                    function dispatch(i){
                        let fn = middlewares[i]
                        if (!fn) return Promise.resolve()
                        return Promise.resolve(
                            fn(ctx, function next() {
                                return dispatch(i + 1)
                            })
                        )
                    }
                }
            }
       }
       module.exports = ImKoa
    </code>
</pre> 
</details>

koa中间件洋葱圈模型，既可以完成顺序的流程操作，同时又可以完成切面描述，例如鉴权
koa中间件的规范：
1. 一个async函数
2. 接受ctx和next两个参数
3. 任务结束后需要执行next

<pre>
    <code>
        const moddleware = async(ctx, next) => {
            // 来到中间件 洋葱圈的左边
            next()
            // 再次来到中间件 洋葱圈的右边
        }
    </code>
</pre>

中间件常见的任务：
- 请求拦截
- 路由
- 日志
- 静态文件服务



































