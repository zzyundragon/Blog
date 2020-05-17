const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length
const process = require('process')

console.log('numCPUs', numCPUs)
const workers = {}

if (cluster.isMaster) {
  // 开启多个进程
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork()
    workers[worker.pid] = worker
  }
  // 设置异常监听
  cluster.on('death', function (worker) {
    worker = cluster.fork()
    workers[worker.pid] = worker
  })
} else {
  const app = require('./app')
  app.use(async (ctx, next) => {
    console.log('worker', cluster.worker.id, 'pid', cluster.worker.pid)
    next()
  })
  app.listen(3000) // 端口共用
}

process.on('SIGTERM', function() {
  for (const pid in workers) {
    process.kill(pid)
  }
  process.exit(0)
})

require('./test')