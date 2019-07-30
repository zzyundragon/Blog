let arr = ['1', '2', '3']
let arrLike = { 0: '1', 1: '2', 2: '3', length: 3 }
function isArrayLike(o) {
    if (o && typeof o === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296) return true
    else false
}
console.log('arr =', isArrayLike(arr))
console.log('arrLike =',isArrayLike(arrLike))
// 读写
console.log(arr[0], arrLike[0]) // 1 1
arr[0] = '11'
arrLike[0] = '11'
console.log(arr[0], arrLike[0]) // 11 11

// 长度
console.log(arr.length, arrLike.length) // 3 3

// 遍历
for (let index = 0; index < arr.length; index++) {
    console.log(index, arr[index])
}
for (let index = 0; index < arrLike.length; index++) {
    console.log(index, arrLike[index])
}

// 类数组对象可以是用数组的方法吗 比如 push
// arrLike.push('4') // TypeError: arrLike.push is not a function

// 类数组对象如果想要自由使用数组方法，可以使用Function.call间接调用

Array.prototype.push.call(arrLike, '4')
let s = Array.prototype.join.call(arrLike, '&')
console.log('call push ', arrLike)
console.log('call join ', s)
let sss = Array.prototype.map.call(arrLike, function (item) {
    return item + '-'
})
console.log('call map ', sss)
// splice 可以做到类数组对象转数组
let ss = Array.prototype.splice.call(arrLike, 0)
console.log('call splice ', ss)

// 类数组对象转数组
let arrayLike = { 0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
let eg = Array.prototype.slice.call(arrayLike)
console.log(eg, arrayLike) // [ 'name', 'age', 'sex' ] { '0': 'name', '1': 'age', '2': 'sex', length: 3 }

// 2. splice 
// let eg1 = Array.prototype.splice.call(arrayLike, 0)
// console.log(eg1, arrayLike)

// 3. ES6 Array.from
let eg2 = Array.from(arrayLike)
console.log(eg2, arrayLike)
// 4. apply
let eg3 = Array.prototype.concat.apply([], arrayLike)
console.log(eg3, arrayLike)

// 类数组对象的应用，在客户端JavaScript中，一些DOM方法（document.getElementByTagName()等）返回的就是类数组对象
// Arguments对象就是一个类数组对象

// Arguments对象
// arguments对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments指代该函数的arguments对象

function foo(name, age, sex) {
    console.log(name, arguments[0])
    // 改变形参
    name = 'zn'
    console.log(name, arguments[0])

    // 改变arguments
    arguments[1] = '28'
    console.log(age, arguments[1])

    // 测试未传入的是否会绑定
    // console.log(hobby)
    hobby = 'swimming'
    console.log(hobby, arguments[3])
    arguments[3] = 'basketball'
    console.log(hobby, arguments[3])
    bar.apply(this, arguments)
}
function bar(a, b, c) {
    console.log('bar =', a, b, c)
}
foo('zyl', '26', 'man')
/** 类数组的索引属性 length属性 callee属性
  Arguments(3) ["zyl", "26", "man", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    0: "zyl"
    1: "26"
    2: "man"
    callee: ƒ foo(name, age, sex)
    length: 3
    Symbol(Symbol.iterator): ƒ values()
    __proto__: Object
 */

let data = []
for (let i = 0; i < 3; i++) {
    (data[i] = function(){
        console.log(arguments.callee.i)
    }).i = i
}
data[0]()
data[1]()
data[2]()

