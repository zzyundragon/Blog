<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMsg">{{errorMsg}}</p>
  </div>
</template>

<script>
export default {
  name: "FormItem",
  inject: ['form'],
  data() {
    return {
      errorMsg: ""
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
        type: String
    }
  },
  mounted () {
      this.$on('validate', this.validate);
  },
  methods: {
      validate() {
          const value = this.form.model[this.prop]
          console.log('进行校验', value, this.form.model[this.prop])
      }
  },
};
</script>

<style>
</style>