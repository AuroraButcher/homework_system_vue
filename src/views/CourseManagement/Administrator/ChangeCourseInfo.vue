<template>
  <el-card class="box-card">
    <template #header>
      <!--页头-->
      <page-header :component="head"></page-header>
    </template>
    <!--表单-->
    <el-form :column="2" border ref=“ruleForm” :model="ruleForm" :rules="rules">
      <el-form-item label="课程编号:" prop="id">
        <el-input v-model="ruleForm.id" :placeholder="adminViewCourseNumber"></el-input>
      </el-form-item>
      <el-form-item label="课程名称:" prop="name">
        <el-input v-model="ruleForm.name" :placeholder="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="所属院系:" prop="Department">
        <el-input v-model="Department" :placeholder="Department"></el-input>
      </el-form-item>
      <el-form-item label="学分:" prop="Credits">
        <el-input v-model="Credits" :placeholder="Credits"></el-input>
      </el-form-item>
      <el-form-item label="学时:" prop="Hour">
        <el-input v-model="Hour" :placeholder="Hour"></el-input>
      </el-form-item>
      <el-form-item label="最大选修人数:" prop="num">
        <el-input v-model="ruleForm.num" :placeholder="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="授课教师:" prop="teacherName">
        <el-input v-model="ruleForm.teacherName" :placeholder="ruleForm.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="选课人数:" prop="currentNum">
        <el-input v-model="ruleForm.currentNum" :placeholder="ruleForm.currentNum"></el-input>
      </el-form-item>
      <el-form-item label="课程简介:" prop="info">
        <el-input v-model="ruleForm.info" :placeholder="ruleForm.info"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-top: 10px" @click="change('ruleForm')">修改</el-button>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import {mapState} from 'vuex';
import api from '../../../api/index.js'
import {ElMessage} from "element-plus";

export default {
  components: {PageHeader},
  created() {
    api.showCourseDetail(this.adminViewCourseNumber).then(res=>{
      if(res.data.code===20000){
        this.ruleForm=res.data.data.info
      }
    })
  },
  data() {
    return {
      head: '修改课程信息',
      Department:'',
      Credits:'',
      Hour:'',
      ruleForm:{
        id:null,
        name:'',
        num:'',
        teacherName:'',
        currentNum:'',
        info:'',
      },
      rules:{
        id: [
          {required: true,message:'不能为空', trigger: "change"},
        ],
      }
    };
  },
  methods: {
    change(ruleForm){
      console.log(this.ruleForm)
      this.$refs[ruleForm].validate((valid)=>{
        if(valid){
          api.changeCourse(this.ruleForm).then(res=>{
            if(res.data.code===20000){
              ElMessage.success('修改成功')
            }else {
              ElMessage.error("修改失败");
            }
          })
        }else {
          ElMessage.error("error：密码错误");
        }
      })

    }
  },
  computed:{
    ...mapState(['adminViewCourseNumber'])
  }
}
</script>

<style scoped>

</style>