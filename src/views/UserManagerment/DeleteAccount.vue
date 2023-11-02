<template>
  <el-dialog title="注销账号" class="dialog" width="30%" @close="close('ruleForm')" :before-close="handleClose">
    <el-form :model="ruleForm" status-icon  :rules="rules" ref="ruleForm" label-position="left" label-width="80px">
      <!--prop：表单要验证的数据-->
      <!--学工号-->
      <el-form-item label="学工号：" prop="number">
        <el-input type="text" v-model="ruleForm.number" autocomplete="off" disabled :placeholder=this.ruleForm.number></el-input>
      </el-form-item>
      <!--密码，autocomplete表示不自动填充密码-->
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Cookie from "js-cookie";
import api from "../../api";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "DeleteAccount",
  data(){
    const validateOldPass = (rule, value, callback) => {
      if (value === "") {
        // 验证是否输入旧密码
        callback(new Error("请输入密码"));
      } else if (value !== Cookie.get('password')) {
        // 验证两次密码是否一致
        callback(new Error("密码错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm:{
        number:Cookie.get('number'),
        password:'',
      },
      rules:{
        password: [
          {required: true,validator: validateOldPass, trigger: "change"},
        ]}
    }
  },
  props: ['deleteAccount'],
  methods:{
    cancel(){
      this.$emit('deleteAccount',this.delete,false)
    },
    confirm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          api.deleteAccount(this.ruleForm).then(res=>{
            if(res.data.code===20000){
              ElMessage.success('注销成功')
              this.$emit('deleteAccount',this.delete,false)
              Cookie.remove("number")
              Cookie.remove("homeworkNumber")
              Cookie.remove("courseNumber")
              window.location.href="/"
            }else {
              ElMessage.error("注销失败");
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
            this.$emit('deleteAccount',this.delete,false)
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