## 类数组对象
所谓类数组对象就是拥有一个length属性和若干索引属性的对象

    let arr = ['1', '2', '3']
    let arrLike = { 0: '1', 1: '2', 2: '3', length: 3 }
数组和类数组对象的异同在哪里，我们从读写，获取长度遍历三个方面进行比较。
### 读写

    console.log(arr[0], arrLike[0]) // 1 1
    arr[0] = '11'
    arrLike[0] = '11'
    console.log(arr[0], arrLike[0]) // 11 11

### 长度

    console.log(arr.length, arrLike.length) // 3 3

### 遍历

    for (let index = 0; index < arr.length; index++) {
        console.log(index, arr[index])
    }
    for (let index = 0; index < arrLike.length; index++) {
        console.log(index, arrLike[index])
    }
    // 0 '11'
    // 1 '2'
    // 2 '3'

    // 0 '11'
    // 1 '2'
    // 2 '3'

特别像有没有，那类数组对象可以使用数组的方法吗，比如

    arrLike.push('4')

然而会报错： TypeError: arrLike.push is not a function
所以终归不是数组
### 调用数组方法  
类数组对象如果想要自由使用数组的方法，可以用Function.call间接调用

    Array.prototype.push.call(arrLike, '4')

    let s = Array.prototype.join.call(arrLike, '&')

    console.log('call push ', arrLike) // { '0': '11', '1': '2', '2': '3', '3': '4', length: 4 }

    console.log('call join ', s) // 11&2&3&4

    let sss = Array.prototype.map.call(arrLike, function (item) {
        return item + '-'
    })
    console.log('call map ', sss) // [ '11-', '2-', '3-', '4-' ]

    // splice 可以做到类数组对象转数组
    let ss = Array.prototype.splice.call(arrLike, 0)

    console.log('call splice ', ss) // [ '11', '2', '3', '4' ]

### 类数组转数组
类数组转数组方法：
- slice

        Array.prototype.slice.call(arrayLike) //  [ 'name', 'age', 'sex' ]
- splice

        Array.prototype.splice.call(arrayLike, 0) //  [ 'name', 'age', 'sex' ]
- ES6 Array.from

        Array.from(arrayLike) // [ 'name', 'age', 'sex' ]
- apply

        Array.prototype.concat.apply([], arrayLike)
### 类数组的检测

    function isArrayLike(o) {
        if (o && typeof o === 'object' && isFinite(o.length) && o.length >= 0 && o.length === Math.floor(o.length) && o.length < 4294967296) return true
        else false
    }

---
> 类数组对象的应用，在客户端JavaScript中，一些DOM方法（document.getElementByTagName()等）返回的就是类数组对象
Arguments对象就是一个类数组对象
---
## Arguments对象

Arguments对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments指代该函数的Arguments对象。

    function foo(name, age, sex) {
        console.log(arguments)
    }
    foo('zyl', '26', 'man')

打印结果如下： 

   ![dkjf](./images/Arguments.jpg)

除了有类数组的索引属性和length属性外，还有一个callee属性。   

### length属性
表示实参的长度
    
    function foo(b, c, d){
        console.log("实参的长度为：" + arguments.length)
    }

    console.log("形参的长度为：" + foo.length)
    foo(1)

    // 形参的长度为：3
    // 实参的长度为：1

### callee属性
通过Arguments对象的callee属性，可以调用函数自身。

闭包经典面试题使用callee的解决方法

    let data = []
    for (let i = 0; i < 3; i++>) {
        (data[i] = function() {
            console.log(arguments.callee.i)
        }).i = i
    }
    data[0]() // 0
    data[1]() // 1
    data[2]() // 2

一切皆对象，函数也是一种对象。我们可以通过这种方式给函数添加一个自定义的属性。这个解决方式就是给data[i]这个函数添加一个自定义属性，这个属性值就是正确的i值。

### arguments和对应参数的绑定

    function foo(name, age, sex) {

        console.log(name, arguments[0]) // zyl zyl

        // 改变形参
        name = 'zn'

        console.log(name, arguments[0]) // zn zn

        // 改变arguments
        arguments[1] = '28'

        console.log(age, arguments[1]) // 28 28

        // 测试未传入的是否会绑定
        console.log(hobby) // undefined

        hobby = 'swim'
        console.log(hobby, arguments[3]) // swim undefined
        arguments[3] = 'basketball'
        console.log(hobby, arguments[3]) // undefined basketball
    }
    foo('zyl', '26', 'man')

传入的参数，实参和arguments的值会共享，当没有传入的时候不会共享

除此之外，严格模式下实参和arguments也不会共享

### 应用：传递参数
利用arguments可以将参数从一个函数传递到另一个函数

    // 使用apply将foo的参数传递给bar
    function foo () {
        bar.apply(this, arguments)
    }
    function bar(a, b, c) {
        console.log(a, b, c) // 1, 2, 3
    }
    foo(1, 2, 3)

### ES6应用：转数组
使用...运算符，可以轻松地转成数组

    function foo(...arguments){
        console.log(arguments) // [1, 2, 3]
    }
    foo(1, 2, 3)

### 总结
arguments的应用场景其实很多，参数不定长，函数柯里化，递归调用，函数重载等都会用到。