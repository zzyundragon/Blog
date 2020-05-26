<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMsg">{{errorMsg}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  name: "FormItem",
  inject: ["form"],
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
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      const value = this.form.model[this.prop];
      const rules = this.form.rules[this.prop];
      const desc = { [this.prop]: rules };
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errorMsg = errors[0].message;
        } else {
          this.errorMsg = "";
        }
      });
    }
  }
};
</script>

<style>
</style>