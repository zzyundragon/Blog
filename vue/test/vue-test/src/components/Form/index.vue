<template>
  <div>
    <im-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <im-form-item label="用户名" prop="username">
        <im-input v-model="ruleForm.username" type="text" placeholder="请输入用户名" autocomplete="false"></im-input>
      </im-form-item>
      <im-form-item label="密码" prop="password">
        <im-input
          v-model="ruleForm.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="false"
        ></im-input>
      </im-form-item>
      <im-form-item>
        <button type="primary" @click="submitForm('ruleForm')">立即创建</button>
        <button @click="resetForm('ruleForm')">重置</button>
      </im-form-item>
    </im-form>
    <Tree :data='v' v-for="(v, k) in treeData" :key="k"></Tree>
  </div>
</template>

<script>
import Form from "./From";
import FormItem from "./FromItem";
import Input from "./Input";
import Toast from "../toast";
import Create from "@/utils/create";
import Tree from "../tree";
export default {
  name: "index",
  components: {
    "im-form": Form,
    "im-form-item": FormItem,
    "im-input": Input,
    Tree
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择用户密码", trigger: "blur" }
        ]
      },
      treeData: [
        {
          title: "tree 一级",
          children: [
            { title: "tree 201" },
            { title: "tree 202", children: [{ title: "tree 2021" }] }
          ]
        },
        {
            title: 'tree 二级'
        },
        {
            title: 'tree 三级'
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // if (valid) {
        //   alert("submit!");
        // } else {
        //   alert("error submit!!");
        //   // return false
        // }
        const toast = Create(Toast, {
          title: "提交提示",
          desc: valid ? "submit" : "error submit!!",
          duration: 2000
        });
        console.log(toast);
        toast.show();
      });
    },
    resetForm() {}
  }
};
</script>

<style>
</style>