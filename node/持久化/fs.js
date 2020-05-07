const fs = require('fs')
const readline = require('readline')

function get(key) {
  fs.readFile('./data.json', (err, data) => {
    if (err) {
      console.log('数据读取错误', err)
    } else {
      let json = JSON.parse(data)
      console.log(json[key])
    }
  })
}

function set(key, value) {
  fs.readFile('./data.json', (err, data) => {
    if (err) {
      console.log('数据读取错误', err)
    } else {
      let json = data.toString() ? JSON.parse(data) : {}
      json[key] = value
      fs.writeFile('./data.json', JSON.stringify(json), (err, data) => {
        if (err) {
          console.log('数据写入错误', err)
        }
        console.log('写入成功')
      })
    }
  })
}

// 命令行命令执行
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  console.log(input)
  const [handle, key, value] = input.split(' ')
  if (handle === 'get') {
    get(key)
  } else if (handle === 'set'){
    set(key, value)
  } else if(handle === 'exit'){
    rl.close()
  } else {
    console.log('没有命令输入')
  }
})
rl.on('close', () => {
  process.exit(0)
})