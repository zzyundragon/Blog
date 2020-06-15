/**
 * 实现Queue
 * new Queue() .task(()=>{console.log(1)},1000) .task(()=>{console.log(1)},3000) .task(()=>{console.log(1)},1000) .run()
 */

class Queue {
    constructor() {
        this.queue = []
    }
    task(fn, ms) {
        const st = () => {
            setTimeout(() => {
                fn()
                this.next()
            }, ms)
        }
        this.queue.push(st)
        return this
    }
    run() {
        this.next()
    }
    next() {
        let fn = this.queue.shift()
        fn && fn()
    }
}