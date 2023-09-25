<template>
  <div class="backgroundImage"></div>
  <!--登录框板块-->
  <div class="card">
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
      <div style="text-align: center;">
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 110px">登录</el-button>
        <el-button @click="resetForm('ruleForm')" style="width: 110px">修改密码</el-button>
        <router-link to="/register">
          <el-button type="primary" style="margin-left:10px;width: 110px">注册</el-button>
        </router-link>
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
        studentID: [
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
          //alert("submit!");
          window.location.href = "/home";
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

/*父组件*/
.card{
  /*无论网页大小始终居中*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*表单框*/
.box-card {
  /*居中*/
  margin: auto auto;
  /*宽度高度*/
  width: 400px;
  height: 300px;
  /*毛玻璃效果*/
  backdrop-filter: blur(10px);
  background-color: rgba(220, 220, 220, 0.1);
  /*内边距*/
  padding: 20px;
  /*圆角*/
  border-radius: 20px;
}

.login-from {
  margin: auto auto;
}
</style>