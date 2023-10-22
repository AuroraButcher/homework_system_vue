<template>
  <!--背景图片-->
  <div class="backgroundImage"></div>

  <!--找回密码板块-->
  <el-card class="box-card">
    <!--找回密码标题-->
    <h1 style="text-align: center;margin-top: -10px">找回密码</h1>
    <!--进行双向绑定/提供的属性在错误时显示错误图标/rules属性表单验证/添加的引用，通过$refs访问组件/设置表单标签的位置和宽度/添加一个类-->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px">
      <!--prop：表单要验证的数据-->
      <!--学工号-->
      <el-form-item label="学工号：" prop="number">
        <el-input type="text" v-model="ruleForm.number"></el-input>
      </el-form-item>
      <!--新密码，autocomplete表示不自动填充密码-->
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <!--角色，default：管理员-->
      <el-form-item label="角色：">
        <el-radio-group v-model="role">
          <el-radio label="administrator">管理员</el-radio>
          <el-radio label="teacher">教师</el-radio>
          <el-radio label="student">学生</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--邮箱验证码-->
      <el-form-item label="邮箱验证码" prop="captcha">
        <div style="display: flex; justify-content: space-between;">
          <el-input class="captcha" type="text" v-model="ruleForm.captcha"></el-input>
          <el-button class="sendCode" type="primary" @click="captcha()">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>

    <!--按钮-->
    <div style="display: flex; justify-content: space-between;">
      <el-button type="primary" @click="goBack()" class="getBackButton">返回登录</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')" class="getBackButton">找回密码</el-button>
    </div>
  </el-card>
</template>

<script>
import api from "../../api";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      //角色
      role: "administrator",
      //表单属性
      ruleForm: {
        number: "",
        newPassword: "",
        captcha: "",
      },
      //表单验证规则
      rules: {
        number: [
          {required: true, message: "用户名不能为空！", trigger: "change"},
        ],
        newPassword: [
          {required: true, message: "密码不能为空！", trigger: "change"},
        ],
        captcha: [
          {required: true, message: "尚未输入邮箱验证码！", trigger: "change"},
        ],
      },
    };
  },
  methods: {
    // 发送邮箱验证码
    captcha() {
      const regex = /^\d{8}$/; // 8位数字的正则表达式
      if (regex.test(this.ruleForm.number)) {
        api.getBackSendCode(this.ruleForm.number).then(response => {
          if (response.data.code === 20000) {
            ElMessage.success("验证码发送成功");
          } else {
            ElMessage.error("邮箱验证码发送失败")
          }
        })
      }
    },
    //点击找回密码按钮执行的方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.getBackPassword(this.ruleForm).then(response => {
            if (response.data.code === 20000) {
              ElMessageBox.alert('更改密码成功，点击“OK”跳转登录', '消息', {
                confirmButtonText: 'OK',
                callback: action => {
                  if (action === 'confirm') {
                    window.location.href = "/login";
                  }
                }
              })
            } else {
              ElMessage.error("error：找回密码失败");
            }
          })
        } else {
          ElMessage.error("error：找回密码失败");
        }
      });
    },
    // 返回登录页
    goBack() {
      window.location.href = "/login";
    },
  }
};
</script>

<style scoped>
/*背景图片*/
.backgroundImage {
  background: url("../../assets/Image_1.png") no-repeat fixed;
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

/*找回密码按钮*/
.getBackButton {
  width: 50%;
  /* 调整上边距，使其离上方更远 */
  margin-top: 10px;
}
</style>