const Koa = require('koa')
const { initRouter, initController, initService } = require('./imegg-loader')

class ImKoa {
    constructor(conf) {
        this.$app = new Koa(conf)
        this.$ctrl = initController()
        this.$service = initService()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }
    start(port) {
        this.$app.listen(port, () => {
            console.log(`app listen on ${port}`)
        })
    }
}

module.exports = ImKoa