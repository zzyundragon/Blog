module.exports = {
    set body(val) {
        this.res.body = val
    },
    get body() {
        return this.res.body
    },
    get method() {
        return this.req.method
    },
    get url() {
        return this.req.url
    }
}