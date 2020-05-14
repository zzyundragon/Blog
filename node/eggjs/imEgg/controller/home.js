module.exports = {
    index: async ctx => {
        ctx.body = '首页 controller'
    },
    detail: async ctx => {
        ctx.body = '详情 controller'
    }
}