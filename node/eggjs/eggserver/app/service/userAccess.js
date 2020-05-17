const Service = require('egg').Service

class UserAccessService extends Service {
    async login(payload) {
        const { ctx, service } = this
        const user = await service.user.findByMobile(payload.phone)
        if (!user) {
            ctx.throw(404, 'user not found')
        }
        let verifyPsw = await ctx.compare(payload.password, user.password)
        if (verifyPsw) {
            ctx.throw(404, 'user password is error')
        }
        // 生成token
        return { token: await service.actionToken.apply(user._id) }
    }
    async logout() {

    }

    async current() {
        const { ctx, service } = this
        // ctx.state.user 可以提取到jwt编码的data
        const _id = ctx.state.user.data._id
        const user = await service.user.find(_id)
        if (!user) {
            ctx.throw(404, 'user is not found')
        }
        user.password = 'how old are u'
        return user
    }
}

module.exports = UserAccessService