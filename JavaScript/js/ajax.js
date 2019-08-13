/**
 * 创建XMLHttpRequest对象
 */
function CreateXHR() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest()
    } else if (typeof ActiveXObject !== 'undefined') {
        // IE7之前版本兼容
        if (typeof arguments.callee.activeXString !== 'string') {
            let versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp']
            for (let i of versions) {
                try {
                    new ActiveXObject(i)
                    arguments.callee.activeXString = i
                    break
                } catch (error) {
                    console.error(error)
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString)
    } else {
        throw new Error('No XHR Object available!')
    }
}
/**
 * get请求经常发生查询字符串格式引发的错误
 * 可以对查询字符串中每个参数的名称和值用encodeURIComponent进行编码
 * @param {*} params 
 */
function buildParamsStr(params) {
    let str = ''
    for (key in params) {
        // 排除原型中属性
        if (params.hasOwnProperty(key)) {
            // 对查询字符串中每个参数名称和值用encdoeURIComponent()进行编码
            str += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        }
    }
    return str.slice(1)
}
/**
 * get请求查询字符串拼接到URL的末尾
 * @param {String} url 请求地址 
 * @param {String} params 请求参数 
 */
function addURLParams(url, params) {
    url += (url.indexOf('?') === '-1' ? '?' : '&')
    url += params + '&' + new Date().getTime()
    return url
}
/**
 * 
 * @param {String} method 请求类型 
 * @param {String} url 请求地址 
 * @param {Boolean} asyncMode 是否异步 
 * @param {String} data 请求参数 
 * @param {String} sucFunc 请求成功回调 
 * @param {String} faildFunc 请求失败回调 
 */
function Ajax(method, url, asyncMode, params, sucFunc, faildFunc) {
    let paramsStr = buildParamsStr(params)
    if (method === 'get' && params) {
        addURLParams(url, params)
    }
    // 1. 创建Ajax对象
    let xhr = new CreateXHR
    // 2. 连接服务器
    xhr.open(method, url, asyncMode)
    // 3. 发送
    if (method === 'get') {
        xhr.send(null)
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        xhr.send(paramsStr)
    }
    // 4. 接收
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 判断响应状态
            if (xhr.status === 200) { // 判断HTTP状态
                sucFunc(xhr.responseText)
            } else {
                faildFunc()
            }
        }
    }
}