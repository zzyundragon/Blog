// const http = require('http')
// const fs = require('fs')
// const app = http.createServer((request, response) => {
//     let { url, method, headers } = request
//     if (url === '/' && method === 'GET') {
//         fs.readFile('./index.html', (err, data) => {
//             if (err) {
//                 response.statusCode = '500'
//                 response.end('network error')
//             }
//             response.statusCode = '200'
//             response.setHeader('content-type', 'text/html')
//             response.end(data)
//         })
//     } else if (url === '/users' && method === 'GET') {
//         let data = [{ name: 'jerry' }]
//         response.statusCode = '200'
//         response.setHeader('content-type', 'application/json')
//         response.end(JSON.stringify(data))
//     } else if (method === 'GET' && headers.accept.indexOf('image/*') > -1) {
//         fs.createReadStream('.' + url).pipe(response)
//     } else if (method === 'GET' && headers.accept.indexOf('text/css') > -1) {
//         fs.createReadStream('.' + url).pipe(response)
//     } else {
//         response.statusCode = '404'
//         response.end('404')
//     }

//     // response.end('hello node')
// })
// app.listen('3000', () => {
//     console.log('app listen 3000')
// })


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
//     next()
// })
// app.listen('3000', () => {
//     console.log('app listen 3000')
// })


// const ImKoa = require('./koa/imkoa/imKoa')
// const app = new ImKoa()
// app.use((req, res) => {
//     res.writeHead('200')
//     res.end('hi jerry')
// })
// app.listen('3000', () => {
//     console.log('app listen 3000')
// })


const ImKoa = require('./koa/imkoa/imKoa')
const app = new ImKoa()
// app.use((ctx, next) => {
//     console.log(ctx.url, ctx.method)
//     ctx.body = 'hello'
//     // res.end('hi jerry')
// })
app.use(async (ctx, next) => {
    ctx.body = '1'
    await next()
    console.log('fn 1 end')
})
app.use(async (ctx, next) => {
    ctx.body += '2'
    await next()
    console.log('fn 2 end')
})
app.use((ctx, next) => {
    ctx.body += '3'
    console.log('fn 3 end')
})
app.listen('3000', () => {
    console.log('app listen 3000')
})