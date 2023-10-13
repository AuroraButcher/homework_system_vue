<template>
  <div class="backgroundImage"></div>
  <!--登录框板块-->
  <el-card class="box-card">
    <h1 style="text-align: center;margin-top: -10px">登录</h1>
    <!--进行双向绑定/提供的属性在错误时显示错误图标/rules属性表单验证/添加的引用，通过$refs访问组件/设置表单标签的位置和宽度/添加一个类-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" label-width="70px" class="login-from">
      <!--prop：表单要验证的数据-->
      <el-form-item label="学号：" prop="studentID">
        <el-input v-model="ruleForm.studentID"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!--链接及按钮-->
    <div style="display: flex; justify-content: space-between;">
      <el-link type="primary">忘记密码?</el-link>
      <el-link type="primary" href="/register">还未注册?点击注册</el-link>
    </div>
    <el-button type="primary" @click="submitForm('ruleForm')" class="loginButton">登录</el-button>
  </el-card>
</template>

<script>
import api from '../api/index'

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
          window.location.href = "/home";

          /*api.postStuRegister().then(res=>{
            if(res.data.message==='success'){
              window.location.href = "/home";
            }
          })*/

        } else {
          console.log("error submit!!");
          return false;
        }
      });
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

/*表单框*/
.box-card {
  /*无论网页大小始终居中*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*宽度高度*/
  width: 350px;
  height: 330px;
  /*毛玻璃效果*/
  backdrop-filter: blur(30px);
  background-color: rgba(220, 220, 220, 0.1);
  /*内边距*/
  padding: 10px;
  /*圆角*/
  border-radius: 20px;
}

.loginButton {
  width: 100%;
  margin-top: 20px; /* 调整上边距，使其离上方更远 */
}
</style>