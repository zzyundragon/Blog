module.exports = {
    get url() {
        return this.request.url
    },
    get method() {
        return this.request.methods.toLowerCase()
    }
}