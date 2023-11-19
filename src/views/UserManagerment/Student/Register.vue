<template>
  <!--背景图片-->
  <div class="backgroundImage"></div>

  <!--注册板块-->
  <el-card class="box-card">
    <!--注册标题-->
    <h1 style="text-align: center;margin-top: -10px">学生注册</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <!--prop：表单要验证的数据-->
      <!--学工号-->
      <el-form-item label="学号:" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <!--密码，autocomplete表示不自动填充密码-->
      <el-form-item label="密码:" prop="password">
        <el-input :show-password="true" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <!--再次输入以确认密码-->
      <el-form-item label="确认密码:" prop="password_2">
        <el-input :show-password="true" type="password" v-model="ruleForm.password_2" autocomplete="off"></el-input>
      </el-form-item>
      <!--邮箱验证码-->
      <el-form-item label="邮箱验证码:" prop="captcha">
        <div style="display: flex; justify-content: space-between;">
          <el-input class="captcha" type="text" v-model="ruleForm.captcha"></el-input>
          <el-button class="sendCode" type="primary" @click="captcha()">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!--按钮-->
    <div style="text-align: center">
      <el-link type="primary" href="/login">已有账号?立即登录</el-link>
    </div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">提交</el-button>
    </div>
  </el-card>
</template>

<script>
import api from '../../../api';
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "register",
  data() {
    // 判断
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        // 验证第一次是否输入密码
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // 验证第二次是否输入密码
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        // 验证两次密码是否一致
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        number: "",
        password: "",
        password_2: "",
        captcha: "",
      },
      rules: {
        number: [
          {required: true, message: "学号不能为空！", trigger: "change"},
        ],
        password: [
          {required: true, validator: validatePass, trigger: "change"}
        ],
        password_2: [
          {required: true, validator: validatePass2, trigger: "change"},
        ],
        captcha: [
          {required: true, message: "尚未输入邮箱验证码！", trigger: "change"},
        ],
      },
    };
  },
  methods: {
    captcha() {
      // 8位数字的正则表达式
      const regex = /^\d{8}$/;
      if (regex.test(this.ruleForm.number)) {
        api.registerSendCode(this.ruleForm.number).then(response => {
          if (response.data.code === 20000) {
            ElMessage.success("验证码发送成功");
          } else {
            ElMessage.error("验证码发送失败");
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //学生注册
          api.studentRegister(this.ruleForm).then(response => {
            if (response.data.code === 20000) {
              // 验证成功，弹出确认框，点击后跳转
              ElMessageBox.alert('注册成功，点击“OK”进行跳转', '消息', {
                confirmButtonText: 'OK',
                callback: action => {
                  if (action === 'confirm') {
                    this.$router.push('/login');
                  }
                }
              })
            } else {
              ElMessageBox.alert('注册失败，请重新进行注册', '消息', {
                confirmButtonText: 'OK',
              })
            }
          })
        } else {
          ElMessage.error("error：您不能注册");
        }
      });
    },
  },
};
</script>

<style scoped>
/*背景图片*/
.backgroundImage {
  background: url("../../../assets/Image_1.png") no-repeat fixed;
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
  padding: 20px;
  /*圆角*/
  border-radius: 20px;
}

/*验证码输入框*/
.captcha {
  width: 150px;
}

/*发送验证码按钮*/
.sendCode {
  border: 1px solid #66ccff;
  width: 100px;
  margin-left: 10px;
}
</style>