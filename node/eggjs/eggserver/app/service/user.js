const Service = require('egg').Service

class UserService extends Service {

    /**
     * 创建用户
     * @param {*} payload 
     */
    async create(payload) {
        const { ctx } = this
        // 生成hash
        payload.password = await ctx.genHash(payload.password)
        return ctx.model.User.create(payload)
    }

    /**
     * 根据手机号获取用户信息
     * @param {*} payload 
     */

    async findByMobile(phone) {
        const { ctx } = this
        return ctx.model.User.findOne({ phone: phone })
    }

    /**
     * 更新用户信息
     * @param {*} payload 
     */
    async updateOne(payload) {
        const { ctx } = this
        // 生成hash 
        payload.password = await ctx.genHash(payload.password)
        const { id, username, password, phone } = payload
        return ctx.model.User.updateOne({ _id: id }, { $set: { username, password, phone } })
    }
}
module.exports = UserService