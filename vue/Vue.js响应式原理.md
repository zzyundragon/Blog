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

## compile
拿到数据之后，需要去捕获模板中的key，换成对应的数据。
- 首先获取到模板对象，通过createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法，这样做可以节省性能。
- 将模板对象添加到虚拟节点对象，在这个虚拟节点中做捕获处理操作
- 将虚拟节点对象这个类数组转化为数组，然后执行遍历操作。
- 获取节点信息，通过判断节点类型以及正则匹配获取到变量
- 最后判断节点的子节点，如果有则递归调用处理函数

至此页面渲染出来了，但是如果要实现数据的动态绑定，首先要实现一个observer拦截所有数据的set和get

<details>
 <summary>click me</summary>
 <pre>
    <code>
        // init.js
        compile(el, tm)
        // compile.js
        export class Compile {
            constructor(el, tm) {
                this.tm = tm
                tm.$el = document.querySelector(el)
                // 节约性能
                let fragment = document.createDocumentFragment()
                let child = null
                while (child = tm.$el.firstChild) {
                    fragment.appendChild(child)
                }
                let frag = this.replace(fragment)
                tm.$el.appendChild(frag)
            }
            replace(frag) {
                Array.from(frag.childNodes).map(node => {
                    let txt = node.textContent
                    let reg = /\{\{(.*?)\}\}/g
                    // 文本
                    if (node.nodeType === 3 && reg.test(txt)) {
                        let val = this.tm
                        let arr = RegExp.$1.split('.')
                        arr.map(item => {
                            val = val[item]
                        })
                        node.textContent = txt.replace(reg, val).trim()
                    }
                    // 节点
                    if (node.nodeType === 1) {
                        let attrs = node.attributes
                        Array.from(attrs).map(attr => {
                            let name = attr.name
                            let exp = attr.value
                            if (name.includes('v-')) {
                                node.value = this.tm[exp]
                            }
                        })
                    }
                    // 递归遍历
                    if (node.childNodes && node.childNodes.length) {
                        this.replace(node)
                    }
                })
                return frag
            }
        }
    </code>
 </pre>
</details>

## obersver

observe拦截数据的get和set只是手段，实现数据观测并且能够触发编译才是最终目的。这里面只会监测有用的数据，哪些数据是没用的？在编译过程中用到了的就是有用的数据。

<details>
 <summary>click me</summary>
 <pre>
    <code>
        // observer.js
        class Observer{
            constructor(data) {
                this.walk(data)
            }
            walk(data) {
                // 遍历所有的对象的所有key，进行拦截get与set
                Object.keys(data).map(key => {
                    if (typeof data[key] === 'object') {
                        // 如果是对象 继续遍历
                        this.walk(data[key])
                    }
                    defineReactive(data, key, data[key])
                })
            }
        }
        // 具体拦截get 与 set
        export const defineReactive = (obj, key, val) => {
            Object.defineProperty(obj, key, {
                set(newValue) {
                    val = newValue
                },
                get() {
                    return val
                }
            })
        }
        // 导出具体一个方法
        export const observer = (data) => {
            return new Observer(data)
        }
    </code>
 </pre>
</details>

