/**
 * 将所有data下面的属性变成观察者对象
 * @param {Object} value 所有data 
 * @param {Function} cb 订阅者回调函数 
 */
function observe(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key], cb))
}
/**
 * 将一个数据属性转换成访问器属性，以达到监听目的
 * @param {Object} obj 属性所在的对象 data
 * @param {String} key 属性名称
 * @param {String} val  属性值
 * @param {Function} cb 数据发生变化后的回调
 */
function defineReactive(obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: () => {
            return val
        },
        set: newValue => {
            val = newValue
            cb() // 订阅者收到消息后的回调
        }
    })
}
/**
 * 将data属性代理到vm实例上
 * @param {Object} data 
 */
function _proxy(data) {
    const that = this
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: () => {
                return that._data[key]
            },
            set: val => {
                that._data[key] = val
            }
        })
    })
}
class Vue {
    constructor(options) {
        _proxy.call(this, options.data) 
        this._data = options.data
        observe(this._data, options.render)
    }
}
let app = new Vue({
    el: '#app',
    data: {
        name: 'zyl',
        age: 26
    },
    render() {
        console.log('render')
    }
})
app.name = 'zn' // render
app.age = 27
console.log(app.name, app.age) // zn 27