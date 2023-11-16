<template>
  <el-dialog title="设置优秀作业" class="dialog" width="30%" @close="close()" @open="open()" :before-close="handleClose">
    <h1>评语</h1>
    <el-input
        type="textarea"
        :rows="4"
        v-model="content"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" v-show="!change" @click="confirm">确认</el-button>
        <el-button type="primary" v-show="change" @click="changeInfo">修改</el-button>
        <el-button type="danger" v-show="change" style="margin-right: auto" @click="del">删除</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import api from "../../../api";
import {ElMessage, ElMessageBox} from "element-plus";
import {mapState} from "vuex";

export default {
  name: "addExcellent",
  data(){
    return {
      change:true,
      content:null
    }
  },
  created() {
  },
  computed:{
    ...mapState(['homeworkID'])
  },
  props: ['addExcellent'],
  methods:{
    cancel(){
      this.$emit('addExcellent',this.addExcellent,false)
    },
    confirm(){
      if(this.content!==null&&this.content!==''){
        api.addExcellent({homeworkID:this.homeworkID,content:this.content}).then(res=>{
          if(res.data.code===20000){
            if(res.data.data.info==='该作业已经是优秀作业！'){
              ElMessage.success('该作业已经是优秀作业')
            } else {
              ElMessage.success('添加成功')
              this.$emit('addExcellent', this.delete, false)
            }
          }else {
            ElMessage.error('添加失败')
          }
        })
      }else {
        ElMessage.error("评语为空")
      }
    },
    changeInfo(){
      if(this.content!==null&&this.content!==''){
        api.modifyExcellent({homeworkID:this.homeworkID,content:this.content}).then(res=>{
          if(res.data.code===20000){
            ElMessage.success('修改成功')
          }else {
            ElMessage.error('错误：'+res.data.message)
          }
        })
      }
    },
    close(){
      this.content=null
    },
    open(){
      api.getOneExcellent(this.homeworkID).then(res=>{
        if(res.data.code===20000){
          if(res.data.data.excellentInfo===null){
            this.change=false
          }else {
            this.change=true
            this.content=res.data.data.excellentInfo.content
          }
        }else{
          ElMessage.error('加载失败')
        }
      })
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
            this.$emit('addExcellent',this.delete,false)
          })
          .catch((res) => {
            console.log(res)
          })
    },
    del(){
      ElMessageBox.confirm(
          '你确定你要删除吗?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            api.deleteExcellent(this.homeworkID).then(res=>{
              if(res.data.code===20000){
                ElMessage.success('删除成功')
                this.$emit('addExcellent',this.delete,false)
              }else {
                ElMessage.error('错误:'+res.data.message)
              }
            })
          })
          .catch((res) => {
            console.log(res)
          })
    },
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>