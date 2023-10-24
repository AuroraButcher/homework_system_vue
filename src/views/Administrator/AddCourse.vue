<template>
  <el-card>
    <template #header>
      <!--页头-->
      <el-page-header @back="onBack">
        <template #content>
          <span> 添加课程 </span>
          <el-tag>Add course</el-tag>
        </template>
      </el-page-header>
    </template>
    <!--表单-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <!--prop：表单要验证的数据-->
      <!--学工号-->
      <el-form-item label="学工号：" prop="number">
        <el-input type="text" v-model="ruleForm.number"></el-input>
      </el-form-item>
      <!--密码，autocomplete表示不自动填充密码-->
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      //表单属性
      ruleForm: {
        number: "",
        password: "",
      },
      //表单验证规则
      rules: {
        number: [
          {required: true, message: "用户名不能为空！", trigger: "change"},
        ],
        password: [
          {required: true, message: "密码不能为空！", trigger: "change"},
        ],
      },
    };
  },
  methods: {
    onBack() {
      window.location.href = "/administratorHome";
    },
  }
}
</script>

<style scoped>

</style>