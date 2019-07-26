let publish = {}
publish.list = [] // 定义发布者缓存列表，存放订阅者回调函数

// 增加订阅者
publish.subscriber = function(key, cb) {
    // publish.list.push(cb) // 将订阅消息添加到缓存列表
    if (!this.list[key]) {
        this.list[key] = []
    }
    this.list[key].push(cb)
}

// 发布消息
publish.trigger = function () {
    let key = Array.prototype.shift.call(arguments)
    console.log('key =', key)
    let cbs = this.list[key]
    if (!cbs || cbs.length === 0) {
        return 
    }
    for (let i of cbs) {
        let cb = i
        cb.apply(this, arguments)
    }
}

publish.subscriber('huaweip30', function(model) {
    console.log('first 型号 =', model)
})

publish.subscriber('block', function (model) {
    console.log("second 型号 =" + model)
})

publish.trigger('huaweip30', 3998)