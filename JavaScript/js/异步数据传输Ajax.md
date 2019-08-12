异步传输数据可以向服务器请求数据而无须刷新页面，带来了更好地用户体验。
## Ajax（Asynchromous JavaScript And XML）
Ajax的核心Api是XMLHttpRequest对象，XHR为向服务器发送请求和解析服务器响应提供了流畅的接口，能够以异步的方式从服务器获取信息，用户单击后，可以不必刷新页面通过DOM将新数据插入到页面中。

### XMLHttpRequest对象
使用XHR对象时，要调用的第一个方法是open()，接受三个参数：
- 要发送请求的类型：get、post、delete、put等
- 请求的URL
- 表示是否异步发送请求的布尔值，false同步，true异步

        xhr.open('get', 'hello.html', false)
        xhr.setRequestHeader('myHeader', 'myValue') // 设置请求头信息
        xhr.send(null)
        xhr.abort() // 异步模式下，调用该方法来取消异步请求

send()方法接受一个必传参数，即要作为请求主体发送的数据。如果没有则填null。调完send方法后请求就会被发送到服务器。

> 同源策略，只能向同一个域中使用相同端口和协议的URL发送请求。

再接收到服务器响应后，响应的数据会自动填充到XHR对象的属性。相关属性如下：
- responseText 作为响应主体被返回的文本
- responseXML 如果响应内容类型是'text/xml'或'application/xml'，这个属性保存着响应数据的XML DOM文档
- status 响应的HTTP状态
- statusText HTTP状态说明
- readyState 表示请求/响应过程的当前活动阶段，0未初始化1启动2发送3接收4完成，该属性值发生变化即触发一次readystatechange事件   

接收到响应后，第一步检查status属性，以确定响应已经成功返回。

### HTTP头部信息
每个HTTP请求和响应都会带有相应的头部信息，默认情况下在发送XHR请求的同时还会发送以下头部信息：
- Accept  浏览器能够处理的内容类型
- Accept-Charset  浏览器能够显示的字符集
- Accept-Encoding  浏览器能够处理的压缩编码
- Accept-Language  浏览器当前设置的语言
- Connection  浏览器和服务器之间连接的类型
- Cookie  当前页面设置的cookie
- Host  当前请求的页面所在的域
- Referer  发出请求的页面的URI （正确的单词拼法referrer）
- User-Agent   浏览器的用户代理字符串

设置请求头信息的方法：setRequestHeader('头部字段名称', '头部字段值')

调用XHR对象的getResponseHeader()并传入头部字段名称，可以获取相应的响应头信息，调用getAllResponseHeaders()方法则可以取得一个包含所有头部信息的长字符串。

### HTTP请求类型
GET与POST的区别：
- 请求内容不同，get幂等post非幂等
- 性能差异，post相比get请求消耗的资源更多一些，相同数据量get的请求速度最多可达到post请求的两倍
- 传递参数不同，get查询字符串参数在URL的末尾进行传递，虽然HTTP协议规范没有对URL长度限制，但特定浏览器及服务器对整个URL的字符长度有限制；而post把数据作为请求的主体提交，请求主体包含非常多的数据，而且格式不限。
- 安全性，get方式请求的数据会被浏览器缓存起来，因此可通过浏览器的历史记录中读取这些数据；而post的传递方式对用户不可见相对来说更安全
- 在服务端获取参数的方式不同，因传递方式不同get在服务端通过request.QueryString来获取参数，post通过request.Form来获取参数
- 使用get请求经常会发生一个错误，就是查询字符串的格式有问题。这时可以通过对参数名称和值进行encodeURIComponent()编码
    
除常用GET、POST请求类型外还有：
- HEAD 只请求页面的首部
- PUT   从客户端向服务端传递的数据取代指定的文档内容
- DELETE    请求服务器删除指定的内容
- OPTIONS   允许客户端查看服务器的性能
- MOVE  请求服务器将指定的页面移至另一个网络地址
- COPY  请求服务器将指定的页面拷贝至另一个网络地址
- LINK 请求服务器简历链接关系
- UNLINK 断开链接关系



