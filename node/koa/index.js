const http = require('http')
const app = http.createServer((req, res) => {
   console.log(req.url)
    res.end('hello node')
})
app.listen('3000', () => {
    console.log('app listen 3000')
})

/**
 * 使用koa构建简易的web应用
 */
// const Koa = require('koa')
// const app = new Koa()
// app.use((ctx, next) => {
//     ctx.body = [
//         {
//             name: 'jerry'
//         }
//     ]
//     next()
// })
// app.use((ctx, next) => {
//     console.log(ctx.url)
// })
// app.listen('3000', () => {
//     console.log('app listen 3000')
// })


/**
 * 未封装req和res的koa自实现
 */
// const ImKoa = require('./imkoa/imKoa')
// const app = new ImKoa()
// app.use((request, response) => {
//     response.writeHeader(200)
//     response.end('hello node')
// })
// app.listen('3000', () => {
//     console.log('app listen 3000')
// })

/**
 * 引入context上下文，将原始请求对象的req和res封装并挂载到context上下文，并且在context上设置getter和setter
 */

// const ImKoa = require('./imkoa/imKoa')
// const app = new ImKoa()
// app.use(ctx => {
//     console.log(ctx.url)
//     ctx.body = 'hh'
// })
// // app.use(ctx => {
// //     console.log(ctx.url)
// // })
// app.listen('3000', () => {
//     console.log('app listen 3000')
// })