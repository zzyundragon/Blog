class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`my name is ${this.name}, age ${this.age}`)
    }
}
class NewPerson extends Person {
    constructor(...args) {
        super(...args)
        this.money = money
    }
    getInfo() {
        alert(`my info ${this.name}, age ${this.age}, have ${this.money} money`)
    }
}
let zhao = new NewPerson('jerry', 26, 'a lot')
console.dir(zhao)
zhao.eat()
zhao.speak()
zhao.getInfo()
// let zhou = new Person('ally', 28)
// zhou.eat()
// zhou.speak()