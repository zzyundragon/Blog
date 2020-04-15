<pre>
    <code>
        function _new () {
            // 1. 创建一个新对象
            let obj = Object.create(null)
            // 2. 获取构造函数参数
            let constructor = Array.prototype.shift.call(arguments)
            // 3. 将构造函数的作用域赋值给新对象
            obj.__proto__ = constructor.prototype
            // 4. apply给obj设置属性和方法
            let res = constructor.apply(res, arguments)
            // 4. 返回新对象
            return res instanceOf Object ? res : res
        }
    </code>
</pre>