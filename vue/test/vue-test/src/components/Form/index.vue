<template>
  <div>
    <im-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <im-form-item label="用户名" prop="username">
        <im-input v-model="ruleForm.username" type='text' placeholder='请输入用户名'></im-input>
      </im-form-item>
      <im-form-item label="密码" prop="password">
        <im-input v-model="ruleForm.password" type='password' placeholder='请输入密码'></im-input>
      </im-form-item>
      <im-form-item>
        <button type="primary" @click="submitForm('ruleForm')">立即创建</button>
        <button @click="resetForm('ruleForm')">重置</button>
      </im-form-item>
    </im-form>
  </div>
</template>

<script>
import Form from "./From";
import FormItem from "./FromItem";
import Input from "./Input";
export default {
  name: "index",
  components: {
    "im-form": Form,
    "im-form-item": FormItem,
    "im-input": Input
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {},
    resetForm() {}
  }
};
</script>

<style>
</style>