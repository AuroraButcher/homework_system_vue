<template>
  <el-dialog title="修改密码" class="dialog" width="30%" @close="close('ruleForm')" :before-close="handleClose">
    <el-form :model="ruleForm" status-icon  :rules="rules" ref="ruleForm" label-position="left" label-width="80px">
      <!--prop：表单要验证的数据-->
      <!--学工号-->
      <el-form-item label="学工号：" prop="number">
        <el-input type="text" v-model="ruleForm.number" autocomplete="off" disabled :placeholder=this.ruleForm.numebr></el-input>
      </el-form-item>
      <!--密码，autocomplete表示不自动填充密码-->
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 新密码-->
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="newPassword2">
        <el-input type="password" v-model="ruleForm.newPassword2" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Cookie from "js-cookie";
import {ElMessage} from "element-plus";
import api from '../api/index'

export default {
  name: "changePassword",
  data(){
    const validateOldPass = (rule, value, callback) => {
      if (value === "") {
        // 验证是否输入旧密码
        callback(new Error("请输入旧密码"));
      } else if (value !== Cookie.get('password')) {
        // 验证两次密码是否一致
        callback(new Error("密码错误"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {

      if (value === "") {
        // 验证第一次是否输入密码
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // 验证第二次是否输入密码
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.newPassword) {
        // 验证两次密码是否一致
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return{
      ruleForm:{
        number:Cookie.get('number'),
        password:'',
        newPassword:'',
        newPassword2:'',
      },
      rules:{
        password: [
          {required: true,validator: validateOldPass, trigger: "change"},
        ],
        newPassword: [
          {required: true,validator:validatePass, trigger: "change"},
        ],
        newPassword2: [
          {required: true,validator:validatePass2, trigger: "change"},
        ],
      }
    }
  },
  props: ['changeCancel'],
  methods:{
    cancel(){
      this.$emit('changeCancel',this.change,false)
    },
    confirm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          api.studentChangePassword(this.ruleForm).then(res=>{
            if(res.data.code===20000){
              ElMessage.success('修改成功')
              this.$emit('changeCancel',this.change,false)
              console.log(this.ruleForm)
            }else {
              ElMessage.error("修改失败");
            }
          })
        }else {
          ElMessage.error("error：密码错误");
        }
      })
    },
    close(formName){
      this.$refs[formName].resetFields();
    },
    handleClose(){
      ElMessageBox.confirm(
          '你确定你要关闭吗?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            this.$emit('changeCancel',this.change,false)
          })
          .catch(() => {

          })
    }
  }
}
</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>