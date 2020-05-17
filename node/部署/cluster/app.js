const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  Math.random() > 0.5 ? appp() : '2'
  await next()
  ctx.body = `<h1>cluster</h1>`
})

if (!module.parent) {
  app.listen(3000, () => {
    console.log('app listen on 3000')
  })
} else {
  module.exports = app
}