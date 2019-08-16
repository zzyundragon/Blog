## 1. 写react、vue项目时为什么要在列表组件中写key，其作用是什么

key是每一个元素节点vnode唯一的ID，可以通过key更准确更快速的拿到oldVnode对应的vnode节点。

vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点。在交叉对比中，当新节点跟旧节点头尾交叉对比没有结果时，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言。map映射的速度更快。

有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
## 2. ['1', '2', '3'].map(parseInt) what & why ?

> 真正的答案是[1, NaN, NaN]

map函数，array.map(function(currentValue,index,arr), thisValue)接收两个参数：
- callback 必需，函数，数组中的每个元素都会执行这个函数
- this.Value 接受三个参数：
    - currentValue	必须。当前元素的值
    - index	可选。当前元素的索引值
    - arr	可选。当前元素属于的数组对象

parseInt(string, radix) 
接受两个参数：
- string 必需，表示要被解析的字符串
- radix 可选，表示要解析的数字的基数，该值介于2~36之间。
    - 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。
    - 如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
    - 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。

## 3. 什么是防抖和节流？有什么区别？如何实现？
防抖，触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。每次触发事件时都取消之前的延时调用方法

防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!

        function debounce(fn) {
            let timeout = null; // 创建一个标记用来存放定时器的返回值
            return function () {
                clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
                timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
                fn.apply(this, arguments);
                }, 500);
            };
        }
        function sayHi() {
            console.log('防抖成功');
        }

        let inp = document.getElementById('inp');
        inp.addEventListener('input', debounce(sayHi)); // 防抖

节流，高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。每次触发事件时都判断当前是否有等待执行的延时函数

节流的原理很简单：如果你持续触发事件，每隔一段时间，只执行一次事件。根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。



        function throttle(fn) {
            let canRun = true; // 通过闭包保存一个标记
            return function () {
                if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
                canRun = false; // 立即设置为false
                setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
                fn.apply(this, arguments);
                // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
                canRun = true;
                }, 500);
            };
        }
        function sayHi(e) {
        console.log(e.target.innerWidth, e.target.innerHeight);
        }
        window.addEventListener('resize', throttle(sayHi));

## 4. 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
        
**set** ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成 Set 数据结构。

## 5. 异步 & 任务队列 & 运行机制
### 任务队列
首先明白几件事情：
- js分同步任务好异步任务
- 同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件
- 一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行

根据规范，事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合；每个任务都有一个任务源(task source)，源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。 setTimeout/Promise 等API便是任务源，而进入任务队列的是他们指定的具体执行任务。
