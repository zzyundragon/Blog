import link from './link.vue'
import view from './view.vue'
let Vue
class ImRouter {
  constructor (options) {
    // 将入参保存起来
    this.$options = options
    // 需要创建一个响应式的current属性，
    // 之后curren发生变化的时候，相应的组件会重新render
    // 实现数据的双向绑定 借助vue实现 我们有两种方法：
    // 一是通过vue的实例创建；二是通过vue提供的defineReactive做响应化
    // Vue.util.defineReactive(this, current, '/')
    this.app = new Vue({
      data () {
        return {
          current: '/'
        }
      }
    })
    // 接下来要监听url的变化
    window.addEventListener('hashChange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
    // 创建一个路由映射表
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange () {
    this.current = window.location.href.slice(1)
  }
}
// 将ImRouter注册为一个插件，入参为Vue实例，将实例赋值给我们自定义的Vue变量以在ImRouter中使用，减少对Vue包的引用
ImRouter.install = function (_Vue) {
  Vue = _Vue
  // 挂载router 记不记得入口文件main.js处new Vue实例时传入了一个router
  // Vue.mixin混入 用来扩展vue的功能
  Vue.mixin({
    breforeCreate () {
      // 只在根实例的时候才执行挂载router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // 实现两个全局组件
  Vue.component('router-link', link)
  Vue.component('router-view', view)
}

export default ImRouter
