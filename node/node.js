/**
 * nodejs是什么？有什么特性？
 * 异步的IO操作，事件机制
 * 
 * 常用模块：
 *      核心模块：不需要require即可调用 Buffer、module、process
 *      内置模块：fs、path、os、util、http、event
 *      第三方模块：download-git-repo、ora
 */

const fs = require('fs')
// const download = require('download-git-repo')
// const ora = require('ora')
// const chalk = require('chalk');
// const process = ora(`Loading ${chalk.red('project')}`)
// process.start()
// download('zzyundragon/electron-cli', 'test', (err, data) => {
//     if (err) process.fail()
//     process.succeed()
// })

fs.readFile('./package.json', (err, data) => {
    if (err) {
        console.log('err')
    } else {
        console.log(data.toString())
    }
})
console.log('12')