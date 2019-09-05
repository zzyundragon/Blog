# vue响应式原理
- Object.definePropert()将属性全部转化为访问器属性，操作该属性的getter和setter方法
- 发布订阅者模式

vue.js采用数据劫持结合发布订阅者模式，通过`Object.definePropert()`来劫持各个属性的`setter`和`getter`方法，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：
1. 将需要observe的数据对象进行递归遍历，包括子属性对象的属性都加上setter和getter，这样某个对象的属性值有改动时，就会触发setter，那么就能监听到数据的变化了。
2. 添加数据的订阅者将变化更新到页面视图上，compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图