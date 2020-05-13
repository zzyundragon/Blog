// const app = new (require('koa'))()
// const { initRouter } = require('./imegg-loader')
// app.use(initRouter().routes())

// app.listen('3000', () => {
//     console.log('app listen on 3000')
// })

const ImEgg = require('./imegg')
const app = new ImEgg()
app.start('3000')