const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    await next()
    if (ctx.url === '/list') {
        ctx.body = [
            {
                name: 'jerry',
                info: 'list'
            }
        ]
    } else if (ctx.url === '/name') {
        ctx.body = [
            {
                name: 'jerry',
                info: 'name'
            }
        ]
    } else if (ctx.url === '/age') {
        ctx.body = [
            {
                name: 'jerry',
                info: 'age'
            }
        ]
    } else if (ctx.url === '/say') {
        ctx.body = [
            {
                name: 'jerry',
                info: 'say'
            }
        ]
    } else if (ctx.url === '/eat') {
        ctx.body = [
            {
                name: 'jerry',
                info: 'eat'
            }
        ]
    }
})

app.listen('8080', () => {
    console.log('app listen on 8080')
})