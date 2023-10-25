<template>
  <el-card class="box-card">
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--表单-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <div class="form-row">
        <el-form-item label="课程编号：" prop="cno">
          <el-input type="text" v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="课程名称：" prop="cname">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="教师工号：" prop="tno" >
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="form-row2">
        <el-form-item label="学分：" prop="credit">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学时：" prop="hour">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属院系：" prop="department">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大选修人数：" prop="maxNumber">
          <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="课程简介：" prop="introduction">
        <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
<!--      TODO 完成提交按钮功能-->
      <el-button type="primary" @click="commit">提交</el-button>

    </el-form>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
export default {
  components: {PageHeader},
  data() {
    return {
      head:'添加课程',
      //表单属性
      ruleForm: {

      },
      //表单验证规则
      rules: {

      },
    };
  },
  methods: {
    commit(){

    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.form-row2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: 10px;
}
.form-row .el-form-item {
  flex-basis: calc(33.33% - 10px);
}
</style>