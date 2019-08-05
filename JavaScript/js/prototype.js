function Person(name) {
    this.name = name
}
Person.prototype.age = 26
Person.prototype.sayName = function() {
    console.log(this.name)
}
let person1 = new Person('zyl')
console.log(person1)
person1.sayName()


// function SuperType(){
//     this.prototype = true
// }
// SuperType.prototype.getSuperValue = function () {
//     return this.prototype
// }
// function SubType() {
//     this.subValue = false
// }
// // 继承了SuperType
// SubType.prototype = new SuperType()
// SubType.prototype.getSubValue = function() {
//     return this.subValue
// }
// let instance = new SubType()
// console.log(instance.getSuperValue())

function SuperType() {
    this.colors = ['red', 'yellow', 'green']
}
function SubType() {}
// 继承SuperType
SubType.prototype = new SuperType()
let instance = new SubType()
instance.colors.push('black')
console.log(instance.colors)
let instance1 = new SubType()
console.log(instance1.colors)