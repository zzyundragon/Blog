// const promise = new Promise((resolve, reject) => {
//     console.log('some code')
//     let status = true
//     if (status) {
//         resolve('resolve')
//     } else {
//         reject('reject')
//     }
// })
// promise.then((value) => {
//     console.log(value)
// })

// function timeFunc(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done')
//     })
// }

// timeFunc(100).then((value) => {
//     console.log('value -', value)
// })

// let promise = new Promise((resolve, reject) => {
//     console.log('1')
//     resolve()
// })
// promise.then(() => {
//     console.log('resolve')
// }) 
// console.log('hi')

// let p1 = new Promise((resolve, reject) => {
//     setTimeout(reject, 3000, 'p1 rejected')
// }) 
// let p2 = new Promise((resolve, reject) => {
//     console.log('p2')
//     setTimeout(resolve, 1000, p1)
// })
// p2.then(result => {
//     console.log('result =', result)
// }).catch(err => {
//     console.log('error =', err)
// })


let p1 = new Promise((resolve, reject) => {
    resolve('p1 resolved')
    throw new Error('test')
})
p1.then(() => {
    throw new Error('p1 then')
}).catch(error => {
    console.log('error =', error)
})