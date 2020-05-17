const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir)
    // 读取文件
    const files = fs.readdirSync(url)
    files.forEach(fileName => {
        fileName = fileName.replace('.js', '')
        const file = require(url + '/' + fileName)
        cb(fileName, file)
    })
}

function initRouter(app) {
    const router = new Router()
    load('routes', (fileName, routes) => {
        // 路由前缀
        const prefix = fileName === 'index' ? '' : `/${fileName}`
        routes = typeof routes === 'function' ? routes(app) : routes
        // 遍历路由文件
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射地址：${method.toLocaleLowerCase()} ${prefix}${path}`)
            // router[method](prefix + path, routes[key])
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            })
        })
    })
    return router
}

function initController() {
    const ctrls = {}
    load('controller', (fileName, ctrl) => {
        ctrls[fileName] = ctrl
    })
    return ctrls
}

function initService() {
    const services = {}
    load('service', (fileName, service) => {
        services[fileName] = service
    })
    return services
}

module.exports = { initRouter, initController, initService }