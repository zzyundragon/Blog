module.exports = (option, app) => {
    return async function (ctx, next) {
        try {
            await next()
        } catch (err) {
            // 所有的异常都在app上触发一个error事件，框架会记录一条错误日志
            app.emit('error', err, this)
            const status = err.status || 500
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message
            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = {
                code: status, // 服务端自身的处理逻辑错误（包含框架错误500 及 自定义业务逻辑错误）
                error: error
            }
            if (status === 422) { // 用户定义型错误
                ctx.body.detail = err.errors
            }
            ctx.status = 200
        }
    }
}