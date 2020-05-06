import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './modules/home'

Vue.use(VueRouter)

const routes = [
  ...Home,
  /* 其他不可识别的路由统一跳转到主页 */
  {
    path: '*',
    redirect: '/'
  }
]
const router = new VueRouter({
  routes
})

export default router
