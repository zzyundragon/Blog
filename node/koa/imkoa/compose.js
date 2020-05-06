// const add = (x, y) => x + y
// const squary = x => x * x
// const fn = (x, y) => squary(add(x, y))
// console.log(fn(1, 2))

// const compose = (f1, f2) => (...args) => f1(f2(...args))
// const fn2 = compose(squary, add)
// console.log(fn2(1, 2))

// const composeMore = (...[first, ...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }

// const fn3 = composeMore(add, squary, squary)
// console.log(fn3(1, 2))

// function composeFunc(middlewares) {
//     return function () {
//         return f(0)
//         function f(i) {
//             let fn = middlewares[i]
//             if (!fn) return Promise.resolve()
//             return Promise.resolve(
//                 fn(function next() {
//                     return f(i + 1)
//                 })
//             )
//         }
//     }
// }

// const f1 = async function (next) {
//     console.log('f1 ...')
//     await next()
//     console.log('f1 end')
// }

// const f2 = async function (next) {
//     console.log('f2 ...')
//     await next()
//     console.log('f2 end')
// }

// const f3 = async function (next) {
//     console.log('f3 ...')
//     await next()
//     console.log('f3 end')
// }

// const middlewares = [f1, f2, f3]
// const finalFn = composeFunc(middlewares)
// console.log(finalFn())


const add = (x, y) => x + y
const square = z => z * z
console.log(square(add(1, 2))) // 9 外层函数的参数实际是内层函数的返回值

// 将两个函数封装
// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))


// 如果需要封装的函数为不确定的多个时

// const compose = (...[first, ...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }

// const fn = compose(add, square, square)
// console.log(fn(1, 2))

const fn1 = async (next) => {
    console.log('fn1')
    await next()
    console.log('fn1 end')
}
const fn2 = async (next) => {
    console.log('fn2')
    await next()
    console.log('fn2 end')
}
const fn3 = async (next) => {
    console.log('fn3')
    await next()
    console.log('fn3 end')
}

const middlewares = [fn1, fn2, fn3]
const fn = compose(middlewares)
console.log(fn())
function compose(middlewares) {
    return function() {
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if (!fn) return Promise.resolve()
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}