const Koa = require('koa')
const session = require('koa-session')
// 将session存入redis
const redis = require('redis')
const redisStore = require('koa-redis')
const redisClient = redis.createClient(6379, 'localhost')
const wraper = require('co-redis')
const client = wraper(redisClient)
const app = new Koa()

app.keys = ['jerry session key']
const SESSION_CONFIG = {
    key: 'jerry:session',
    maxAge: '86400000',
    httpOnly: true,
    signed: false,
    store: redisStore({ client })
}

// 注册
app.use(session(SESSION_CONFIG, app))

// 打印reids
app.use(async (ctx, next) => {
    const keys = await client.keys('*')
    keys.forEach(async key => {
        console.log(await client.get(key))
    })
    next()
})

app.use(ctx => {
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第${n}次访问`
})

app.listen('3000')