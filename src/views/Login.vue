<template>
  <div class="backgroundImage"></div>
  <!--登录框板块-->
  <div>
    <el-card class="box-card">
      <h2 style="text-align: center">登录</h2>
      <!--进行双向绑定/提供的属性在错误时显示错误图标/rules属性表单验证/添加的引用，通过$refs访问组件/设置表单标签的位置和宽度/添加一个类-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" label-width="70px" class="login-from">
        <!--prop：表单要验证的数据-->
        <el-form-item label="学号" prop="studentID">
          <el-input v-model="ruleForm.studentID"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!--按钮-->
      <div class="buttonGroup" style="text-align: center;">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <router-link to="/register">
          <el-button style="margin-left:10px">注册</el-button>
        </router-link>
      </div>
      <div style="text-align: center;">
        <el-button @click="resetForm('ruleForm')" style="margin-top: 10px;">修改密码</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //对象
      ruleForm: {
        studentID: "",
        password: "",
      },
      //规则
      rules: {
        username: [
          {required: true, message: "用户名不能为空！", trigger: "blur"},
        ],
        password: [
          {required: true, message: "密码不能为空！", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
/*背景图片*/
.backgroundImage {
  background-image: url("../assets/Image_2.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

/*表单框*/
.box-card {
  margin: auto auto;
  width: 410px;
  height: 350px;
  position: absolute;
  top: 25%;
  left: 10%;
}

.login-from {
  margin: auto auto;
}
</style>