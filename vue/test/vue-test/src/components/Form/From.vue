<template>
  <div>
    <p>表单验证</p>
    <slot></slot>
    <p>{{model}}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
      Promise.all(tasks).then(() => cb(true)).catch(() => cb(false))
    }
  },
}
</script>

<style>
</style>
