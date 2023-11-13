<template>
  <el-card class="box-card">
    <template #header>
      <!--页头-->
      <page-header :component="head"></page-header>
    </template>
    <!--表单-->
    <el-form :column="2" border :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <el-form-item label="课程编号:" prop="id">
        <el-input disabled type="text" v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="课程名称:" prop="name">
        <el-input disabled type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="最大选修人数:" prop="num">
        <el-input disabled type="text" v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="授课教师:" prop="teacherName">
        <el-input disabled type="text" v-model="ruleForm.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="选课人数:" prop="currentNum">
        <el-input disabled type="text" v-model="ruleForm.currentNum"></el-input>
      </el-form-item>
      <el-form-item label="课程简介:" prop="info">
        <el-input type="textarea" v-model="ruleForm.info" @change="handleInfoChange"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-top: 10px" @click="changeInfo('ruleForm')">修改</el-button>
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
    api.showCourseDetail(this.courseNumber).then(res => {
      if (res.data.code === 20000) {
        this.ruleForm = res.data.data.info;
      }
    })
  },
  data() {
    return {
      head: '修改课程信息',
      ruleForm:{
        id:null,
        name:'',
        num:'',
        teacherName:'',
        currentNum:'',
        info:'',
      },
      rules:{
        info: [
          {required: true,message:'不能为空', trigger: "change"},
        ],
      }
    };
  },
  methods: {
    changeInfo(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          api.changeCourse(this.ruleForm).then(res=>{
            if(res.data.code===20000){
              ElMessage.success('修改成功')
            }else {
              ElMessage.error("修改失败");
            }
          })
        }
      })
    },
    handleInfoChange(newValue) {
      this.ruleForm.info = newValue;
    }
  },
  computed:{
    ...mapState(['courseNumber'])
  }
}
</script>

<style scoped>

</style>