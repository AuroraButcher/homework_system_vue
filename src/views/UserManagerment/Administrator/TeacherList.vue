<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-button type="primary" @click="addTeacher">添加教师</el-button>
      <el-button type="primary" @click="showDialog">批量添加</el-button>
    </div>
    <!--目前教师名单-->
  </el-card>

  <!--上传附件的弹出框-->
  <el-dialog v-model="dialogFileVisible" title="批量添加教师">
    <el-upload action="/homework/addFile" :auto-upload="false" :file-list="fileList" :on-change="handleChange" :limit="1" accept=".xlsx,.xls">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button type="success" style="margin-left: 10px" @click="submitUpload">上传文件</el-button>
      <template #tip>
        <div>Excel文件 & 小于5Mb</div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "教师列表",
      dialogFileVisible: false,
      fileList: [],
    }
  },
  created() {
    //TODO:教师名单展示
  },
  methods:{
    showDialog(){
      this.dialogFileVisible = true;
    },
    addTeacher(){
      // TODO:添加教师
    },
    submitUpload(){
      // TODO:批量添加
    },
    // 处理文件改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
  }
}
</script>

<style scoped>
.hang{
  display: flex;
}
</style>