<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--表单-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
      <el-form-item label="课程名称：" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!--TODO:将添加课程的教师工号改为名字级联表-->
      <el-form-item label="教师工号：" prop="teacher">
        <el-input type="text" v-model="ruleForm.teacher" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程简介：" prop="info">
        <el-input type="text" v-model="ruleForm.info"></el-input>
      </el-form-item>
      <el-form-item label="最大选课量：" prop="num">
        <el-input type="text" v-model="ruleForm.num" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="commit(ruleForm)">提交</el-button>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessageBox} from "element-plus";

export default {
  components: {PageHeader},
  data() {
    return {
      head: '添加课程',
      //表单属性
      ruleForm: {
        info: null,
        name: null,
        teacher: null,
        num: null,
      },
      //表单验证规则
      rules: {
        info: [
          {required: true, message: "课程简介不能为空！", trigger: "change"}
        ],
        name: [
          {required: true, message: "课程名称不能为空！", trigger: "change"}
        ],
        teacher: [
          {required: true, message: "教师工号不能为空！", trigger: "change"}
        ],
        num: [
          {required: true, message: "最大选课量不能为空！", trigger: "change"}
        ],
      },
    };
  },
  methods: {
    commit(formName) {
      api.addCourse(this.ruleForm).then(response => {
        if (response.data.code === 20000) {
          ElMessageBox.alert(response.data.message, '消息', {
            confirmButtonText: 'OK',
            callback: action => {
              if (action === 'confirm') {
                this.$refs["ruleForm"].resetFields();
              }
            }
          })
        } else {
          ElMessageBox.alert(response.data.message, '消息', {
            confirmButtonText: 'OK',
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>