module.exports = {
    createUserRequest: {
        username: {type: 'string', description: '用户名', required: true, example: 'jerry'},
        password: {type: 'string', description: '用户密码', required: true, example: 'jerry'},
        phone: { type: 'string', description: '用户手机号', required: true, example: '1', format: /^1[3456789]\d{9}$/ }
    },
    createUserResponse: {
        code: { type: 'string', description: '返回状态码', required: true, example: '200' },
        data: {
            type: 'string', description: '返回的数据对象', required: true, example: {
                msg: '用户创建成功'
            }
        }
    }
}