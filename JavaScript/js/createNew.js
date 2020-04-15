function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayName = function () {
    console.log('name: ', this.name)
    return this.name
}
let person1 = new Person('jerry', 26)
console.log(person1)
person1.sayName()

function newFunction() {
    // 通过Object.create创建一个空对象；
    var res = Object.create(null);
    // 排除第一个构造函数参数
    var construct = Array.prototype.shift.call(arguments);
    res.__proto__ = construct.prototype;
    // 使用apply执行构造函数，将构造函数的属性挂载在res上面
    var conRes = construct.apply(res, arguments);
    // 判断返回类型
    return conRes instanceof Object ? conRes : res;
  }

function createNew() {
    let obj = Object.create(null)
    let constructorName = Array.prototype.shift.call(arguments)
    obj.__ptoto__ = constructorName.prototype
    let res = constructorName.apply(obj, arguments)
    console.log('***', constructorName.prototype, obj.__proto__)
    // return res instanceof Object ? res : obj
    return obj
}
let person2 = newFunction(Person, 'ally', 28)
console.log(person2)
person2.sayName()