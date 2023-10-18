<template>
  <el-dialog title="修改密码" class="dialog" width="30%" @close="close('ruleForm')">
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
    return{
      ruleForm:{
        numebr:Cookie.get('number'),
        password:'',
        newPassword:'',
      },
      rules:{
        password: [
          {required: true, message: "密码不能为空！", trigger: "change"},
        ],
        newPassword: [
          {required: true, message: "新密码不能为空！", trigger: "change"},
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
      this.$refs[formName].validate(valid=>{
        if(valid){
          api.studentChangePassword(this.ruleForm).then(res=>{
            if(res.data.code===20000){
              ElMessage.success('修改成功')
              this.$emit('changeCancel',this.change,false)

              this.ruleForm.password=''
              this.ruleForm.newPassword=''
            }else {
              ElMessage.error("修改失败");
              this.ruleForm.password=''
              this.ruleForm.newPassword=''
            }
          })
        }else {
          ElMessage.error("error：密码错误");
          this.ruleForm.password=''
          this.ruleForm.newPassword=''
        }
      })
    },
    close(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>