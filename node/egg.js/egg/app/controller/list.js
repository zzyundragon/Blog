const Controller = require('egg').Controller
class ListController extends Controller {
    async index() {
        const { ctx } = this
        ctx.body = [
            {
                list: [
                    { 'a': 'hhh' },
                    { 'a': 'hhh' },
                    { 'a': 'hhh' }
                ]
            }
        ]
    }
}
module.exports = ListController