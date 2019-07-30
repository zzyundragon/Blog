let foo = {
    value: 1
}
function bar () {
    console.log(this.value)
}
let bindFoo = bar.bind(foo)
bindFoo()

// 返回函数的模拟实现
Function.prototype.bind2 = function(context) {
    let self = this
    return function () {
        return self.apply(context)
    }
}

let bind2Foo = bar.bind2(foo)
bind2Foo()

// 传参的模拟实现

function bar2(name, age) {
    console.log(this.value)
    console.log(name)
    console.log(age)
}
let bindFoo3 = bar2.bind(foo, 'zyl')
bindFoo3('45')

Function.prototype.bind3 = function(context) {
    let self = this
    // 获取bind3函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1)
    return function() {
        // 此时的arguments是bind3返回函数的传入参数
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(context, args.concat(bindArgs))
    }
}
let bindFoo4 = bar2.bind3(foo, 'zyl')
bindFoo4('26')
console.log('==============')
// 构造函数效果的模拟实现
bar2.prototype.friend = 'zn'
let bindFoo5 = bar2.bind(foo, 'zyl')
let obj = new bindFoo5('18')
console.log('obj =', obj.friend)

Function.prototype.bind4 = function(context) {
    let self = this
    // 获取bind3函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1)
    let fBound = function() {
        // 此时的arguments是bind3返回函数的传入参数
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    fBound.prototype = this.prototype
    return fBound
}

