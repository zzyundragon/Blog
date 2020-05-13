const Service = require('egg').Service
class UserService extends Service {
    async getAll() {
        // return [
        //     { name: 'jerry', age: '26' },
        //     { name: 'ally', age: '28' }
        // ]
        return await this.ctx.model.User.findAll()
    }
    // async insertOne() {
    //     const { ctx } = this
    //     const { name, age } = ctx.query
    //     console.log('name', name, 'age', age, 'ctx', ctx.query)
    //     const user = await ctx.model.User.create({ name, age })
    //     return user
    // }
}
module.exports = UserService