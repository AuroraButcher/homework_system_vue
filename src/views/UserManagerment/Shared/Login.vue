<template>
  <!--背景图片-->
  <div class="backgroundImage"></div>

  <!--登录板块-->
  <el-card class="box-card">
    <!--登录标题-->
    <h1 style="text-align: center;margin-top: -10px">登录</h1>
    <!--进行双向绑定/提供的属性在错误时显示错误图标/rules属性表单验证/添加的引用，通过$refs访问组件/设置表单标签的位置和宽度/添加一个类-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <!--prop：表单要验证的数据-->
      <!--学工号-->
      <el-form-item label="学工号：" prop="number">
        <el-input type="text" v-model="ruleForm.number"></el-input>
      </el-form-item>
      <!--密码，autocomplete表示不自动填充密码-->
      <el-form-item label="密码：" prop="password">
        <el-input :show-password="true" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <!--角色，default：管理员-->
      <el-form-item label="角色：" required>
        <el-radio-group v-model="role">
          <el-radio label="administrator">管理员</el-radio>
          <el-radio label="teacher">教师</el-radio>
          <el-radio label="student">学生</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!--修改密码、注册跳转链接-->
    <div style="display: flex; justify-content: space-between;">
      <el-link type="primary" href="/getBackPassword">忘记密码?点击找回</el-link>
      <el-link type="primary" href="/register">还未注册?点击注册</el-link>
    </div>
    <!--登录按钮-->
    <el-button type="primary" @click="submitForm('ruleForm')" class="loginButton">登录</el-button>
  </el-card>
</template>

<script>
import api from "../../../api";
import {ElMessage} from "element-plus";
import Cookie from 'js-cookie';

export default {
  name: "login",
  data() {
    return {
      //角色
      role: "student",
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
    //点击登录按钮执行的方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.role === "student") {
            //学生校验
            api.studentLogin(this.ruleForm).then(response => {
              if (response.data.code === 20000) {
                Cookie.set('number', this.ruleForm.number);
                Cookie.set('password', this.ruleForm.password);
                this.$store.commit('setRole', this.role);
                this.$router.push('/studentHome');
              } else {
                ElMessage.error(response.data.message);
              }
            }).catch(error => {
              console.error(error);
            });
          } else if (this.role === "teacher") {
            api.teacherLogin(this.ruleForm).then(response => {
              if (response.data.code === 20000) {
            Cookie.set('number', this.ruleForm.number);
            Cookie.set('password', this.ruleForm.password);
            this.$store.commit('setRole', this.role);
            this.$router.push('/teacherHome');
            } else {
              ElMessage.error(response.data.message);
            }
          }).catch(error => {
            console.error(error);
          });
          } else {
            // 管理员校验
            api.adminLogin(this.ruleForm).then(response => {
              if (response.data.code === 20000) {
                Cookie.set('number', this.ruleForm.number);
                Cookie.set('password', this.ruleForm.password);
                this.$store.commit('setRole', this.role);
                this.$router.push('/adminHome');
              } else {
                ElMessage.error(response.data.message);
              }
            }).catch(error => {
              console.error(error);
            });
          }
        } else {
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
  background: url("../../../assets/background.jpg") no-repeat fixed;
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
  width: 400px;
  /*毛玻璃效果*/
  backdrop-filter: blur(30px);
  background-color: rgba(220, 220, 220, 0.1);
  /*内边距*/
  padding: 10px;
  /*圆角*/
  border-radius: 20px;
}

/*登录按钮*/
.loginButton {
  width: 100%;
  /* 调整上边距，使其离上方更远 */
  margin-top: 20px;
}
</style>