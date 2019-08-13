// 'use strict'
let person = {
    name: 'zyl'
}
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'zn'
})
console.log(person.name) // zn
person.name = 'zz'
console.log(person.name) // zn

// 定义访问器属性

let book = {
    _year: 2018,
    time: 1
}
Object.defineProperty(book, 'year', {
    get: () => {
        return this._year
    },
    set: function (newValue) {
        if (newValue > this._year) {
            this._year = newValue
            this.time += newValue - 2018
        }
    }
})
book.year = 2019
console.log(book) // { _year: 2019, time: 2 }

// 读取属性的特性
let books = {}
Object.defineProperties(books, {
    _year: {
        value: 2018
    },
    time: {
        value: 1
    },
    year: {
        get: () => {
            return this._year
        },
        set: function (newValue) {
            if (newValue > this._year) {
                this._year = newValue
                this.time += newValue - 2018
            }
        }
    }
})
let desc = Object.getOwnPropertyDescriptor(books, '_year')
console.log(desc)
let descs = Object.getOwnPropertyDescriptor(books, 'year')
console.log(descs)