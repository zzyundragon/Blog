1. ['1', '2', '3'].map(parseInt) what & why ?

这道题主要是讲JavaScript的映射和解析。parseInt()函数解析一个字符串参数，并返回一个指定基数的整数。当入参没有指定字符串的基数或者基数为0时，如果字符串不是以‘0’或者‘0x’开头的基数默认为10，也就是以十进制来处理字符串。而map映射方法会创建一个新数组，其结果是该数组中的每个元素都会调用一个提供的函数后返回结果。通常只使用第一个参数回调函数当前正在处理的值currentValue，还有两个可选参数，当前元素的索引值和map方法被调用的数组本身。这道题对于每个迭代map，都会给parseInt方法传递两个参数，字符串和基数，所以执行结果是

```
['1', '2', '3'].map((item, index) => {
	return parseInt(item, index)
})
// 返回值分别为：
parseInt('1', 0) // 1
parseInt('2', 1) // NaN
parseInt('3', 2) // NaN, 3 不是二进制
```

如果要想循环访问字符串数组，那就在每个迭代map中把字符串转换成数值类型，使用Number方法。

2. 什么是防抖和节流？有什么区别？如何实现？
- 防抖：事件高频触发，在规定的时间内只执行一次，如果在规定时间内再次触发，则重新计算事件。实现思路：每次触发事件时清除上一次触发的定时器

    ```
    function debounce(fn, wait=50) {
        let timer = null
        return function(...args) {
            if (timer) clearTimeOut(timer)
            timer = setTimeOut(() => {
                fn.apply(this, args)
            }, wait)
        }
    }
    ````

- 节流：可以有效的降低函数调用的频率，函数会随触发次数调用多次，但是调用频率会降低。实现思路：每次触发事件时都去判断当前是否有等待执行的延时函数

    ```
    function throttle(fn, wait=50){
        let canRun = true
        return function (...args) {
                if (!canRun) return
                canRun = false
                func.apply(this, args) // 将方法放在外面, 这样即便该函数是异步的，也可以保证在下一句之前执行
                setTimeout(() => { canRun = true }, wait)
            }
        }
    }
    ```
