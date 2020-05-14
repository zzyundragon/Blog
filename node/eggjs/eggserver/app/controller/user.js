const Controller = require('egg').Controller

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
    constructor(conf) {
        super(conf)
    }

    /**
     * @summary 创建用户
     * @description 创建用户，记录用户信息
     * @router post /user/create
     * @request body createUserRequest *body
     * @response 200 createUserResponse 创建成功
     */
    async create() {
        const { ctx } = this
        ctx.validate(ctx.rule.createUserRequest)
        const {username, password, phone} = ctx.request.body
        let ret = await ctx.model.User.create({username, password, phone})
        const res = { msg: 'user create success:' + ret, userInfo: await ctx.model.User.find() }
        ctx.helper.success({ ctx, res })
    }

}

module.exports = UserController