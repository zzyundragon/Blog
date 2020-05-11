const http = require('http')

const session = {} // 一般存在redis数据库中
http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.end('')
        return
    }
    const sessionKey = 'sid'
    const cookie = req.headers.cookie
    if (cookie && cookie.indexOf(sessionKey) > -1) {
        // 来过
        res.end('come back')
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session =', sid, session, session[sid])
    } else {
        const sid = (Math.random() * 999999).toFixed()
        // 设置cookie
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
        session[sid] = { name: 'jerry' }
        res.end('hello sessionId')
    }
}).listen('3000')