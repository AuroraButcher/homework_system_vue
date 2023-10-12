<template>
  <div class="backgroundImage"></div>
  <!--注册框板块-->
  <div class="card">
    <el-card class="box-card">
      <h1 style="text-align: center;margin-top: -10px">注册</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" label-width="70px" class="demo-ruleForm">
        <el-form-item label="学号" prop="studentID">
          <el-input v-model="ruleForm.studentID"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_2">
          <el-input type="password" v-model="ruleForm.password_2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!--按钮-->
      <div style="text-align: center">
        <el-link type="primary" href="/login">已有账号?立即登录</el-link>
      </div>
      <div style="text-align: center;margin-top: 10px;">
        <el-button @click="resetForm('ruleForm')" style="width: 140px">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 140px">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        studentID: "",
        password: "",
        password_2: "",
      },
      rules: {
        studentID: [
          {required: true, message: "用户名不能为空！", trigger: "blur"},
        ],
        password: [
          {required: true, validator: validatePass, trigger: "blur"}
        ],
        password_2: [
          {required: true, validator: validatePass2, trigger: "blur"},
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
  background: url("../assets/Image_1.png") no-repeat fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

/*父组件*/
.card {
  /*无论网页大小始终居中*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/*表单框*/
.box-card {
  /*无论网页大小始终居中*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*宽度高度*/
  width: 350px;
  height: 370px;
  /*毛玻璃效果*/
  backdrop-filter: blur(30px);
  background-color: rgba(220, 220, 220, 0.1);
  /*内边距*/
  padding: 20px;
  /*圆角*/
  border-radius: 20px;
}
</style>