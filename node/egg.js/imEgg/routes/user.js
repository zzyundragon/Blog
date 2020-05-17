module.exports = app => ({
    // 'get /': async ctx => {
    //     ctx.body = 'user'
    // },
    // 'get /info': async ctx => {
    //     ctx.body = 'user info'
    // }
    'get /': async () => {
        app.ctx.body = '返回的用户名是：' + await app.$service.user.getName()
    }
})