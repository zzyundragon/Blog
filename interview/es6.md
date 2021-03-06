# var、let及const的区别
- 什么是变量提升
- 什么是暂时性死区
### **变量提升**
js代码在执行之前，会先创建执行上下文环境，将代码中即将要执行的变量和函数都拿出来，变量会暂时赋值为undefined，函数会提前声明好。这种情况就叫做提升，并且提升的是声明。
### **暂时性死区**
不能在声明前使用变量，这也是let和const优于var的一点。和变量提升不一样的是，虽然变量在编译环节中被告知在块作用域中可以访问，但是访问是受限制的。
### **区别**
- let和const 声明变量，变量并不会挂载到window上，而var会
- var存在提升，可以在声明之前被访问到；而let和const因为暂时性死区不可以在声明前使用
- let和const作用基本一致，其中const声明的变量不能再次赋值
# 箭头函数
箭头函数表达式的语法比函数表达式更简短，并且不绑定自己的this，arguments，super或new.target。最适合用于非方法函数，并且不能用作构造函数。

箭头函数与普通函数的区别：
- 没有this，需要通过查找作用域来确定this的值
- 没有arguments
- 不能通过new关键字调用
- 没有new.target
- 没有原型
- 没有super
# 原型继承和class继承
- 原型如何实现继承
- class如何实现继承
- class的本质是什么

class只是个语法糖其本质还是函数，js中并不存在类。
### **组合继承**
原型链+构造函数的方式实现继承，使用原型链实现对原型属性和方法的继承，再通过借用构造函数来实现对实例属性的继承。
### **寄生组合继承**
### **class继承**
class实现继承的核心在于使用extends表明继承自哪个父类，并且在子类构造函数中必须调用super，因为这段代码可以看成是 `Parent.call(this, value)`
# 模块化
- 为什么使用模块化
- 哪些方式实现模块化，各有什么特点

> **使用模块化主要是为了解决：命名冲突，提供复用性以及提高代码的可维护性。**

### 立即执行函数
通过函数作用域解决命名冲突，污染全局作用域的问题
### CommonJS
最早在Node中使用，现在webpack中也常用到。`module.exports` 将模块导出，在需要模块的文件内 `require` 引入。
### ES Module
原生实现的模块化方法，使用 `import from` 引入模块，`export/export default` 导出模块。与CommonJS不同的地方在于：
1. CommonJS是同步的，ES Module是异步的
2. CommonJS支持动态引入，而ES Module不可以
3. CommonJS导出是值拷贝，就算导出的值变了而引入的值是不会变的，必须重新导入才可以；而ES Module采用的是实时绑定的方式，导入导出的值都指向同一个内存地址
### AMD 和 CMD
目前这两种方式应用较少。主要通过`define`加载模块，在函数作用域内引用。
# Proxy
- Proxy可以实现什么功能

vue3.0中将会通过`Proxy`来替换原本的`Object.defineProperty`来实现数据响应式。Proxy是ES6中新增的功能，它可以用来自定义对象中的操作。

        let p = new Proxy(target, handler)

`target`代表需要添加代理的对象，`handler`用来自定义对象中的操作。在`handler`中可以自定义`set`或者`get`函数。之所以vue3.0要使用Proxy替换原本的API，原因在于Proxy无需一层层递归为每个属性添加代理，性能上表现更好。
# map，filter，reduce
- map 遍历原数组，将每一个元素拿出来做一些操作后放入新的数组中去，接收三个参数：当前元素索引，索引，原数组
- filter 遍历数组将返回值为true的元素放入新数组中，入参与map函数相同
- reduce 可以将数组中的元素通过回调函数最终转换为一个值，接收两个参数：回调函数和初始值