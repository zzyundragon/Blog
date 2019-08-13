/**
 * 以下为观察者对象的实现代码，其中包含了订阅相关的方法
 * 并可以将任意对象转变为发布者
 */
let observer = {
    // 添加订阅者
    addSubscriber: function (cb) {
        if (typeof cb === 'function') {
            this.subscribers[this.subscribers.length] = cb
        }
    },
    // 删除订阅者
    removeSubscriber: function (cb) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if(this.subscribers[i] === cb) {
                delete this.subscribers[i]
            }               
        }
    },
    // 传递数据给订阅者
    publish: function (data) {
        for (let i of this.subscribers) {
            if (typeof i === 'function') {
                i(data)
            }
        }
    },
    // 将任意对象转换为发布者，并添加上面的方法
    make: function (obj) {
        for (const i in this) {
            if (this.hasOwnProperty(i)) {
                obj[i] = this[i]
                obj.subscribers = []
            }
        }
    }
}
/**
 * 订阅者可以是任意对象，
 * 它们唯一的职责是在某些重要事件发生事调用publish()方法
 */
let blogger = {
    writeBlogPost: function (data) {
        let content = data + 'Today is ' + new Date()
        this.publish(content)
    }
}
let la_times = {
    newIssue: function () {
        let paper = '新一期刊出来了！'
        this.publish(paper)
    }
}
// 转变为发布者
observer.make(blogger)
observer.make(la_times)

/**
 * 准备两个订阅者 tom and jerry
 * 他们可以订阅blogger对象，只需要提供事件发生时的回调函数
 */
let tom = {
    read: function (data) {
        console.log('Tom 正在阅读' + data)
    }
}
let jerry = {
    say: function (data) {
        console.log('jerry 说' + data)
    }
}
blogger.addSubscriber(tom.read)
blogger.addSubscriber(jerry.say)
// 当blogger写了新的博客
blogger.writeBlogPost('《观察者模式》') 
/**
 * Tom 正在阅读《观察者模式》Today is Tue Aug 13 2019 14:53:07 GMT+0800 (GMT+08:00)
 * jerry 说《观察者模式》Today is Tue Aug 13 2019 14:53:07 GMT+0800 (GMT+08:00)
 */

// 随时取消订阅
blogger.removeSubscriber(jerry.say)
blogger.writeBlogPost('《发布订阅者模式》') // Tom 正在阅读《发布订阅者模式》Today is Tue Aug 13 2019 14:52:54 GMT+0800 (GMT+08:00)

la_times.addSubscriber(jerry.say)
la_times.newIssue() // jerry 说新一期刊出来了！