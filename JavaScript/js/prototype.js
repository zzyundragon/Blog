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