const Controller = require('egg').Controller

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
    constructor(conf) {
        super(conf)
    }

    /**
     * @summary 用户登录
     * @description 用户登录接口
     * @router post /user/login
     * @request body userLoginRequest * body
     * @response 200 baseResponse 返回成功
     */
    async login() {
        const { ctx } = this
        ctx.validate(ctx.rule.userLoginRequest)
        const { phone, password } = ctx.request.body
        let pwd = await ctx.genHash(password)
        let res = await ctx.service.userAccess.login({ phone, password: pwd })
        ctx.helper.success({ ctx, res })
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
        const { username, password, phone } = ctx.request.body
        let ret = await ctx.service.user.create({ username, password, phone })
        // let ret = await ctx.model.User.create({username, password, phone})
        const res = { msg: 'user create success:' + ret, userInfo: await ctx.model.User.find() }
        ctx.helper.success({ ctx, res })
    }

    /**
     * @summary 删除用户
     * @description 根据id删除用户信息
     * @router post /user/delete
     * @request body deleteUserRequest *body
     * @response 200 baseResponse 删除成功
     */
    async delete() {
        const { ctx } = this
        ctx.validate(ctx.rule.deleteUserRequest)
        const { id } = ctx.request.body
        let res = await ctx.model.User.deleteOne({ _id: id })
        ctx.helper.success({ ctx, res })
    }

    /**
     * @summary 获取全部用户信息
     * @description 获取全部用户信息
     * @router post /user/getAll
     * @request body baseRequest *body
     * @response 200 baseResponse 获取成功
     */
    async getAll() {
        const { ctx } = this
        let res = await ctx.model.User.find({})
        ctx.helper.success({ ctx, res })
    }

    /**
     * @summary 更新用户信息
     * @description 更新用户信息
     * @router post /user/update
     * @request body updateUserRequest *body
     * @response 200 baseResponse 获取成功
     */
    async update() {
        const { ctx } = this
        ctx.validate(ctx.rule.deleteUserRequest)
        const { id, username, password, phone } = ctx.request.body
        let res = await ctx.service.user.updateOne({ id, username, password, phone })
        ctx.helper.success({ ctx, res })
    }

}

module.exports = UserController