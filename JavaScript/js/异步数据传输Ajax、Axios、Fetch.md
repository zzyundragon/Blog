异步传输数据可以向服务器请求数据而无须刷新页面，带来了更好地用户体验。
## Ajax（Asynchromous JavaScript + XML）
Ajax的核心Api是XMLHttpRequest对象，XHR为向服务器发送请求和解析服务器响应提供了流畅的接口，能够以异步的方式从服务器获取信息，用户单击后，可以不必刷新页面通过DOM将新数据插入到页面中。

### XMLHttpRequest对象
使用XHR对象时，要调用的第一个方法是open()，接受三个参数：
- 要发送请求的类型：get、post、delete、put等
- 请求的URL
- 表示是否异步发送请求的布尔值，false同步，true异步

        xhr.open('get', 'hello.html', false)
        xhr.send(null)

send()方法接受一个必传参数，即要作为请求主体发送的数据。如果没有则填null。调完send方法后请求就会被发送到服务器。

> 同源策略，只能向同一个域中使用相同端口和协议的URL发送请求。

再接收到服务器响应后，响应的数据会自动填充到XHR对象的属性。相关属性如下：
- responseText 作为响应主体被返回的文本
- responseXML 如果响应内容类型是'text/xml'或'application/xml'，这个属性保存着响应数据的XML DOM文档
- status 响应的HTTP状态
- statusText HTTP状态说明   

接收到响应后，第一步检查status属性，以确定响应已经成功返回。