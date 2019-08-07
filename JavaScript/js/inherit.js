// 构造函数继承
// function SuperType(color) {
//     this.colors = ['red', 'blue', 'green']
//     this.colors.push(color)
// }
// function SubType() {
//     SuperType.call(this, 'black')
//     this.first_color = this.colors[0]
// }
// let instance = new SubType()
// console.log(instance.colors) // ["red", "blue", "green", "black"]
// instance.colors.push('yellow')
// console.log(instance.colors) // [ 'red', 'blue', 'green', 'black', 'yellow' ]
// let instance_1 = new SubType()
// console.log(instance_1.colors) // [ 'red', 'blue', 'green', 'black' ]

// 组合继承
// function SuperType(name) {
//     this.name = name
//     this.colors = ['red', 'green', 'blue']
// }
// SuperType.prototype.sayName = function() {
//     console.log(this.name)
// }
// function SubType(name, age){
//     SuperType.call(this, name)
//     this.age = age
// }
// SubType.prototype = new SuperType()
// SubType.prototype.sayAge = function() {
//     console.log(this.age)
// }
// let instance = new SubType('zyl', 26)
// instance.colors.push('black')
// console.log(instance.colors) // [ 'red', 'green', 'blue', 'black' ]
// instance.sayAge() // 26
// instance.sayName() // zyl

// let instance_1 = new SubType('zn', 26)
// console.log(instance_1.colors) // [ 'red', 'green', 'blue' ]
// instance_1.sayAge() // 26
// instance_1.sayName() // zn


// 原型式继承
function createObj(o) {
    function F(){}
    F.prototype = o
    return new F()
}
let person = {
    name: 'zyl',
    friends: ['a', 'b', 'c']
}
let anotherPerson = createObj(person)
anotherPerson.name = 'zn'
anotherPerson.friends.push('d') 
console.log(anotherPerson.friends)
let anotherPerson_1 = createObj(person)
console.log(anotherPerson_1.friends)

// 寄生式继承
function createAnother(original) {
    let clone = createObj(original) // 通过调用函数创建一个新对象
    clone.sayHi = function() {  // 以某种方式来增强这个对象
        console.log('hi')
    }
    return clone // 返回这个对象
}
let person_1 = {
    name: 'zn',
    friends: ['a', 'b', 'c']
}
let anotherPerson_2  = createAnother(person_1)
anotherPerson_2.sayHi() // hi

// 寄生组合式继承
function inheritPrototype(subType, superType){
    let prototype = createObj(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
}

function SuperType (name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function() {
    console.log(this.name)
}
function SubType (name, age) {
    SuperType.call(this, name)
    this.age = age
}
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function() {
    console.log(this.age)
}