# 浏览器相关
- BOM
- DOM
- 事件
- Ajax
- 存储
# BOM
**浏览器对象模型**
# DOM
**文档对象模型** 是浏览器本身信息的设置和获取，例如获取浏览器的高度，官渡，设置浏览器跳转页面，保存历史记录等。主要包含以下对象：
- navigator
- screen
- location
- history

# 事件绑定
# Ajax
# 存储
> `cookie` 、`localStorage` 和 `sessionStorage`

cookie一般由服务器生成，大小很小限制在4kb左右，用于标识用户身份，在与服务器通信过程中每次都会携带在HTTP头信息中，可设置失效时间；如果是在浏览器中生成的，默认在浏览器关闭后失效。

而localStorage和sessionStorage主要用于存储浏览器缓存数据，相比较而言比较大一般为5mb，仅存储在客户端，localStorage除非手动清除，否则永久保存，而sessionStorage仅存在于当前会话，关闭页面或浏览器后会被清除。