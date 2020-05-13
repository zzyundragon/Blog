const Controller = require('egg').Controller

class UserController extends Controller {
    async index() {
        const { ctx } = this
        ctx.body = await ctx.service.user.getAll()
    }
    async insertOne() {
        const { ctx } = this
        const {name,age} = ctx.query
        const user = await ctx.model.User.create({name, age})
        // const user = await ctx.service.user.insertOne()
        ctx.body = user
    }
}

module.exports = UserController