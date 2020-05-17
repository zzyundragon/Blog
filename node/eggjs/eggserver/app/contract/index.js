module.exports = {
    baseRequest: {
        id: { type: 'string', description: 'id 唯一键', required: true, example: '1' }
    },
    baseResponse: {
        code: { type: 'integer', required: true, example: 200 },
        data: { type: 'string', example: '请求成功' },
        errorMessage: { type: 'string', example: '请求失败' }
    }
}