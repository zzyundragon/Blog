let MyModules = (function () {
    let modules = {}
    function define(name, deps, func) {
        deps.forEach((v, k) => {
            deps[k] = modules[deps[k]]
        })
        modules[name] = func.apply(func, deps)
    }
    function get(name) {
        return modules[name]
    }
    return {
        define: define, 
        get: get
    }
})()

MyModules.define('bar', [], function () {
    function hello(who) {
        return `let me introduce ${who}`
    }
    return { hello: hello }
})

MyModules.define('foo', ['bar'], function () {
    function awsome() {
        console.log(bar.hello('ally').toUpperCase())
    }
    return { awsome: awsome }
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

console.log(bar.hello('jerry'))
foo.awsome()