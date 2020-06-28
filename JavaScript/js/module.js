var MyModules = (function () {
  var modules = {}
  function define(name, deps, impl) {
    for (let i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]]
    }
    
    modules[name] = impl.apply(impl, deps)
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
    return (`let me introduce ${who}`)
  }
  return {
    hello: hello
  }
})

MyModules.define('foo', ['bar'], function () {
  var hungry = 'ally'
  function awsome() {
    console.log(bar.hello(hungry).toUpperCase())
  }
  return {
    awsome: awsome
  }
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

console.log(bar.hello('jerry'))
foo.awsome()