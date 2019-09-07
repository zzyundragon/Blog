# 浏览器相关
- BOM
- DOM
- 事件机制
- Ajax
- 存储
- 跨域
- 内存泄漏
- 一个页面从输入URL到页面加载显示完成，这中间发生了什么
# BOM
**浏览器对象模型** 是浏览器本身信息的设置和获取，例如获取浏览器的高度宽度，设置浏览器跳转页面，保存历史记录等。主要包含以下对象：
- navigator
- screen
- location
- history
# DOM
**文档对象模型** 

# 事件机制
### 事件触发三阶段
1. window往事件触发处传播，遇到注册的捕获事件会触发（从上到下捕获事件）
2. 传播到事件触发时触发注册的事件（处于目标阶段）
3. 从事件触发处往window传播，遇到注册的冒泡事件会触发（从下到上事件冒泡）
### 注册事件
通常我们使用`addEventListener`注册事件，接收三个参数：
- 事件触发方式
- 事件处理函数
- 可选参数
    - `once` 值为`true`时表示回调只执行一次，调用后移除监听
    - passive 值为`true`时表示事件监听永远不会调用`preventDefault()`，取消事件的默认操作
    - capture 值为`true`时表示事件监听会在该类型的事件捕获阶段传播到eventTarget时触发
### 事件冒泡
如果我们在父元素和子元素都绑定了事件，事件会根据DOM的结构来冒泡，从下到上挨个执行。可以通过在事件中使用 `e.stopPropagation()` 来阻止冒泡
### 事件代理
依靠事件冒泡实现

如果一个节点下的子节点是动态生成的，那么子节点需要注册的事件可以注册在父节点上。有父节点代理事件，通过`event`事件对象针对处理。事件代理相较于直接给目标注册事件来说，代码简介，更加节省浏览器内存，不需要给子节点注销事件。
# Ajax
**是什么** Ajax是一种可以在不重新加载整个页面的情况下，异步与服务器交换数据并更新部分网页的技术

Ajax的原则是“按需取数据”，其最大的 **特点** 在于使网页实现异步更新，使web应用程序更小，更快，更友好。

> 一个Ajax建立的过程是怎样的，主要用到哪些状态码？
1. 首先创建异步调用对象，XMLHttpRequest对象
2. 创建一个新的HTTP请求，并指定请求的方法，URL以及验证信息
3. 设置响应HTTP请求状态变化的函数（`XHR.readyState`  `XHR.status`）
4. 发送HTTP请求
5. 获取异步调用返回的数据
6. 使用JavaScript和DOM实现局部刷新

        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            // 这里的函数异步执行，可参考之前 JS 基础中的异步模块
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.responseText)
                }
            }
        }
        xhr.open("GET", "/api", false)
        xhr.send(null)

当前状态readystate： 0未初始化，1正在加载，2已加载完毕，3服务器正在响应，4服务器响应发送完成

常用状态码status：404，403禁止访问，500，200，304源文件没有被修改
### Fetch API
通过Fetch全局函数可以很简单的发起异步请求，并且支持Promise的回调。

        fetch('some/api/data.json', {
            method:'POST', //请求类型 GET、POST
            headers:{}, // 请求的头信息，形式为 Headers 对象或 ByteString
            body:{}, //请求发送的数据 blob、BufferSource、FormData、URLSearchParams（get 或head 方法中不能包含 body）
            mode:'', //请求的模式，是否跨域等，如 cors、 no-cors 或 same-origin
            credentials:'', //cookie 的跨域策略，如 omit、same-origin 或 include
            cache:'', //请求的 cache 模式: default、no-store、reload、no-cache、 force-cache 或 only-if-cached
        }).then(function(response) { ... });

# 存储
> `cookie` 、`localStorage` 和 `sessionStorage`

cookie一般由服务器生成，大小很小限制在4kb左右，用于标识用户身份，在与服务器通信过程中每次都会携带在HTTP头信息中，可设置失效时间；如果是在浏览器中生成的，默认在浏览器关闭后失效。

而localStorage和sessionStorage主要用于存储浏览器缓存数据，相比较而言比较大一般为5mb，仅存储在客户端不会带到HTTP请求信息中去，localStorage除非手动清除，否则永久保存，而sessionStorage仅存在于当前会话，关闭页面或浏览器后会被清除。
# 跨域
- 什么是跨域
- 为什么浏览器要使用同源策略
- 解决跨域的方式
- 预检请求

在没有同源策略的情况下，我们的网站可以被任意来源的ajax访问到信息，如果网站本身存在登录信息，那么ajax就可以获取到用户的任何信息。浏览器出于安全考虑，使用同源策略。也就是说协议、域名和端口有一个不同就是跨域，ajax请求会失败。主要是为了防止CSRF攻击，它会利用用户的登录态发起恶意请求。

### JSONP
利用`<script>`标签没有跨域限制的漏洞，通过标签指向一个需要访问的地址并提供一个回调函数来接收数据

        <script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
        <script>
            function jsonp(data) {
                console.log(data)
            }
        </script>  

JSONP使用简单，但是仅限于`get`请求
### node代理转发
通过node搭建服务器，转发来自前端的请求
### CORS 跨域资源共享
需要后端支持，服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。
# 内存泄漏
内存泄漏说的是对象在不需要它的情况下依然存在，导致占用的内存无法使用和回收
- 未使用var生命的全局变量
- 闭包函数
- 移除绑有有事件监听的dom元素
- 两个对象间的循环引用

> 可以通过chrome浏览器中的timeline进行内存标记，可视化查看内存的变化情况，迅速找到异常点
# 一个页面从输入URL到页面加载显示完成的过程
- DNS解析
- TCP传输三次握手
- 发送请求，分析url请求
- 服务器返回请求的文件
- 浏览器渲染
    - HTML parser ---> DOM树渲染
    - CSS parser ---> 样式树渲染
    - 结合DOM树和样式树生成渲染树
    - layout结构布局
    - 像素绘制页面
### 三次握手
为了准确无误地将数据送达目的地，建立HTTP请求连接前，客户端和服务端需要通过握手来确认对方：
1. 客户端发送syn（同步序列编号）请求，等待确认
2. 服务端接收并确认syn数据包后，发送syn/ack包以示传达确认信息
3. 客户端接收响应包之后，发送ack包，握手结束
### 四次挥手
断开一个TCP连接则需要四次挥手：
1. 客户端发送FIN数据包给服务端，表示主动告知服务器我已经不会再给你发数据了
2. 服务端收到FIN包后，发送一个ACK给客户端，确认
3. 服务器发送一个FIN/ACK，用来关闭传送到客户端的数据传送
4. 客户端收到数据包后，发送确认序号ACK给服务端，四次挥手结束
### 重绘和回流
