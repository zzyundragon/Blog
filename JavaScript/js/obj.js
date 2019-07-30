function Person(name, age) {
    this.name = name //公开变量
    let ages = age // 私有变量
    this.showName = function () { // 公开函数
        console.log('this.name =', name)
    }
    function showAge() { // 私有函数
        console.log('this.age =', age, ages)
    }
}

let p = new Person('zyl', '26')
p.showName() // this.name = zyl
// p.showAge() //  p.showAge is not a function

// 1. 通过构造函数方式给对象添加方法
function Dog(name) {
    this.name = name
    this.shout = function () {
        console.log(this.name + '在尖叫！')
    }
}

let dog1 = new Dog('usa')
let dog2 = new Dog('us')
if (dog1.shout === dog2.shout) console.log('相等')
else console.log('不相等')
// 不相等

// 2. 通过原型方式给对象添加方法
Dog.prototype.shouts = function () {
    console.log(this.name + '在尖叫！')
}
let dog3 = new Dog('usa')
let dog4 = new Dog('us')
if (dog3.shouts === dog4.shouts) console.log('相等')
else console.log('不相等')
// 相等

function Master(name) {
    this.name = name
}
Master.prototype.feed = function (animal, food) {
    console.log('给' + animal.name + '喂' + food.name)
}
function Cat(name) {
    this.name = name
}
function Fish(name) {
    this.name = name
}
function Tirger(name) {
    this.name = name
}
function Chicken(name) {
    this.name = name
}
let cat = new Cat('猫')
let fish = new Fish('鱼')
let tirger = new Tirger('老虎')
let chicken = new Chicken('鸡肉')

let master = new Master('zl')
master.feed(cat, fish)
master.feed(tirger, chicken)

// 1. 把子类中共有的属性和方法抽取出来，定义父类student
function Student (name, age) {
    this.name = name
    this.age = age
    this.show = function() {
        console.log('------------')
        console.log('学生' + this.name + '今年' + this.age + '岁了！')
    }
}
function MidStu(name, age) {
    this.stu = Student // 通过对象冒充来实现继承 获取到需要继承类的所有成员，因为js是谁调用那个成员就是谁的，这样MidStu就有了Student的属性和方法了
    this.stu(name, age)
    this.payFee = function () {
        console.log('缴费 ', money)
    }
}
function Pupil(name, age) {
    this.stu = Student
    this.stu(name, age)
    this.payFee = function () {
        console.log('** 缴费 ', money)
    }
}
let midStu = new MidStu('zyl', '25')
midStu.show()
let pupil = new Pupil('zn', '27')
pupil.show()

function MidStu1(name, age) {
    Student.call(this, name, age)
}
function Pupil1(name, age) {
    Student.apply(this, [name, age])
}
let midStu1 = new MidStu1('zyx', '23')
midStu1.show()
let pupil1 = new Pupil1('wzm', '2')
pupil1.show()
