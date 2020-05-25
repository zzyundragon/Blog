<template>
  <div>
    <p>表单验证</p>
    <slot></slot>
    <p>{{model}}</p>
  </div>
</template>

<script>
export default {
  name: "index",
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  }
};
</script>

<style>
</style>