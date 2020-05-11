const http = require('http')

http.createServer((req, res)=> {
    if(req.url === '/favicon.ico') {
        res.end('')
        return
    }
    // 查看
    console.log('cookie', req.headers.cookie)
    res.setHeader('Set-Cookie', 'name=jerry')
    res.end('hello cookie')
})
.listen('3000')