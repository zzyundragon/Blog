const fetch = require('./nodeServer/node_modules/node-fetch')
/**
 * 实现一个批量请求函数
 * 要求： 1. 批量请求函数，最大并发数maxNum。
 *       2. 每当有一个请求返回，就留下一个空位，可以增加新的请求。
 *       3. 所有请求完成后，结果按照urls里面的顺序依次打出。 
 */


/**
 * 实现思路：批量执行首先有个for循环，终止条件要小于设定的maxNum
 * 循环过程中，执行完成一个请求后，记录返回结果值，同时递归调用从而达到留空增加新的请求目标
 * arr.shift() 取出第一个元素值 并从原数组中删除掉
 * fetch第一个then返回response对象的promise
 */

let host = 'http://127.0.0.1:8080/'
let address = ['list', 'name', 'age', 'say', 'eat']

const batchRequest = (address, maxNum, cb) => {
    let finished = 0
    let results = {}
    let length = address.length

    const requestFunc = (url, index) => {
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            results[index] = data
            finished += 1
            handleFunc()
        }).catch(error => {
            results[index] = error
            finished += 1
        })
    }
    const handleFunc = () => {
        if (address.length) {
            let url = address.shift()
            requestFunc(host + url, length - address.length - 1)
        }
        if (finished >= length) {
            cb(results)
        }
    }
    for (let i = 0; i < maxNum; i++) {
        handleFunc()
    }
}
let callback = (res => {
    console.log('cb res', res)
})
batchRequest(address, 2, callback)


// let url = 'http://127.0.0.1:8080/list'

// fetch(url).then(response => {
//     return response.json()
// }).then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })