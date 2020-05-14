module.exports = app => ({
    // 'get /': async ctx => {
    //     ctx.body = 'home page'
    // },
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail
})