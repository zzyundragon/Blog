module.exports = {
    'get /': async ctx => {
        ctx.body = 'user'
    },
    'get /info': async ctx => {
        ctx.body = 'user info'
    }
}