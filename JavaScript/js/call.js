function foo(num) {
    console.log(`foo print ${num}`)
    this.count++
}
foo.count = 0
// for (let i = 0; i < 5; i++) {
//     foo(i)
// }
console.log(`foo count print ${foo.count}`) // 0

// this指向问题，foo内部this执向的是window全局，创建了全局count同名属性
// 怎么解决？
// 1. 通过词法作用域
// 2. 通过绑定this

function foo1() {
    console.log(`foo print ${num}`)
    this.count++
}
let data = { count: 0 }
function foo12() {
    console.log(`foo print ${num}`)
    data.count++
}

function foo2() {
    console.log(`foo print ${num}`)
    this.count++
}
for (let i = 0; i < 5; i++) {
    foo.call(foo, i)
}
console.log(`foo count print ${foo.count}`) // 0