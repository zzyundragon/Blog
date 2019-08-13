Vue.js的响应式原理依赖于Object.defineProperty()，通过设定对象属性的setter/getter方法来监听数据的变化。getter函数负责返回有效的值，setter负责决定如何处理数据。每一个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

首先将数据data变为观察者对象

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
                get: () => {
                    return val
                },
                set: newValue => {
                    val = newValue
                    cb() // 订阅者收到消息后的回调
                }
            })
        }
        class Vue {
            constructor(options) {
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
        app._data.name = 'zn' // 当_data数据发生改变的时候就会触发set，对订阅者进行回调
        console.log(app._data.name) // zn

在vue实际应用中，VM实例加属性名便可以设置相应的值，上面的例子中要想通过app.name直接设置，就需要用到代理。


        /**
        * 将data属性代理到vm实例上
        * @param {Object} data 
        */
        function _proxy(data) {
            const that = this
            Object.keys(data).forEach(key => {
                Object.defineProperty(that, key, {
                    get: () => {
                        return that._data[key]
                    },
                    set: val => {
                        that._data[key] = val
                    }
                })
            })
        }

        _proxy.call(this, options.data) /*构造函数中*/

        app.name = 'zn' // render
        app.age = 27  // render
        console.log(app.name, app.age) // zn 27