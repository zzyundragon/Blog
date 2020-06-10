/**
 * 要求设计 LazyMan 类，实现以下功能：
 * LazyMan('Tony'); // Hi I am Tony
 * LazyMan('Tony').sleep(10).eat('lunch'); 
 * // Hi I am Tony
 * // 等待了10秒...
 * // I am eating lunch
 * LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
 * // Hi I am Tony
 * // I am eating lunch
 * // 等待了10秒...
 * // I am eating diner
 * LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
 * // Hi I am Tony
 * // 等待了5秒...
 * // I am eating lunch
 * // I am eating dinner
 * // 等待了10秒...
 * // I am eating junk food
 */

/**
 * 实现思路：用一个队列来保存需要执行的函数
 */
class LazyManClass {
    constructor(props) {
        this.name = props
        this.queue = []
        console.log(`Hi I am ${props}`)
        setTimeout(() => {
            this.next()
        }, 0)
    }
    next() {
        let fn = this.queue.shift()
        fn && fn()
    }
    eat(props) {
        const fn = () => {
            console.log(`I am eating ${props}`)
            this.next()
        }
        this.queue.push(fn)
        return this
    }
    sleep(props) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${props}秒...`)
                this.next()
            }, props * 1000)
        }
        this.queue.push(fn)
        return this
    }
    sleepFirst(props) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${props}秒...`)
                this.next()
            }, props * 1000)
        }
        this.queue.unshift(fn)
        return this
    }
}

const LazyMan = (name) => new LazyManClass(name)
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');