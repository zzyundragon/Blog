class Zvue {
  constructor(options) {
    this.$options = options
    this.$data = options ? options.data : ''
    // 响应化处理
    this.observe(this.$data)
  }
  observe(obj) {
    if (!obj || typeof obj !== 'object') return
    // 遍历value
    Object.keys(obj).forEach(key => {
      // 进行响应式处理
      this.defineReactive(obj, key, obj[key])
      // 代理data中的属性
      this.dataProxy(key)
    })
  }
  defineReactive(obj, key, value) {
    // 递归遍历
    this.observe(value)
    // 给每一个obj的key定义拦截
    Object.defineProperty(obj, key, {
      get() {
        console.log('获取value', key)
        return value
      },
      set(newVal) {
        if (newVal !== value) {
          value = newVal
          console.log(key + '属性更新了')
        }
      }
    })
  }
  dataProxy(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}