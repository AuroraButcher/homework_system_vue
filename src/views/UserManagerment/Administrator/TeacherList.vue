<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-input v-model="teacherName" placeholder="请输入教师名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="searchTeacher(this.teacherName)">搜索</el-button>
      <el-button type="primary" @click="addTeacherDialog">添加教师</el-button>
      <el-button type="primary" @click="showDialog">批量添加</el-button>
    </div>
    <!--目前教师名单-->
    <el-table :data="teacherData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key" :default-sort="{ prop: 'number', order: 'ascending' }">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="教师工号" prop="number" width="120px" sortable></el-table-column>
      <el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="changePassword(scope)">修改密码</el-link>
          <el-button type="primary" link style="margin-left: 10px" @click="deleteAccount(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-model:current-page="pageData.pageNo"
        v-model:page-size="pageData.pageSize"
        :total="pageData.total"
        @current-change="handlePageChange"
        :hide-on-single-page="false"/>
  </el-card>
  <!--单个添加教师弹出框-->
  <el-dialog v-model="dialogAddVisible" title="批量添加教师" style="width: 400px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="70px">
      <el-form-item label="工号：" prop="number">
        <el-input type="text" v-model="ruleForm.number" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input type="text" v-model="ruleForm.name" style="width: 300px"></el-input>
      </el-form-item>
    </el-form>
    <div class="addButton">
      <el-button type="primary" @click="addTeacher('ruleForm')" style="width: 150px;">添加</el-button>
    </div>
  </el-dialog>
  <!--批量添加教师的弹出框-->
  <el-dialog v-model="dialogFileVisible" title="批量添加教师">
    <el-upload action="/homework/addFile" :auto-upload="false" :file-list="fileList" :on-change="handleChange" :limit="1" accept=".xlsx,.xls">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button type="success" style="margin-left: 10px" @click="submitUpload">添加教师</el-button>
      <template #tip>
        <div>Excel文件 & 小于5Mb</div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessage} from "element-plus";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "教师列表",
      dialogAddVisible:false,
      dialogFileVisible: false,
      fileList: [],
      teacherName: null,
      key: 1,
      teacherData: [
        {
          id: null,
          number: null,
          password: null,
          name: null,
        },
      ],
      pageData: {
        pageNo: 1,
        pageSize: 10,
        total: 10,
      },
      ruleForm:{
        number:null,
        name:null,
      },
      rules:{
        number: [
          {required: true, message: "工号不能为空！", trigger: "change"},
        ],
        name: [
          {required: true, message: "姓名不能为空！", trigger: "change"},
        ],
      },
    }
  },
  created() {
    api.getTeacherList(this.pageData).then(res => {
      if (res.data.code === 20000) {
        this.pageData.total = res.data.data.list.total;
        this.teacherData = res.data.data.list.records;
      } else {
        console.log("获取教师名单失败");
      }
    })
  },
  methods:{
    // 展示文件弹出框
    showDialog(){
      this.dialogFileVisible = true;
    },
    // 单个添加弹出框
    addTeacherDialog(){
      this.dialogAddVisible = true;
    },
    // 单个添加教师
    addTeacher(ruleForm){
      // TODO:添加教师
      /*this.$refs[ruleForm].validate((valid) => {
        if(valid){
          api.teacherRegister(ruleForm).then(res =>{
            if(res.data.code === 20000){
              ElMessage.success("添加教师成功");
            }else{
              ElMessage.success("添加教师成功");
            }
          })
        }
      });*/
    },
    // 教师批量添加
    submitUpload() {
      const param = new FormData();
      this.fileList.forEach(val => {
        param.append("multipartFile", val.raw);
      })
      api.teacherBulkImport(param).then(res => {
        if (res.data.code === 20000) {
          ElMessage.success("成功人数：" + res.data.data['成功人数']);
          ElMessage.error("失败人数：" + res.data.data['失败人数']);
        } else {
          ElMessage.error("导入失败");
        }
      })
    },
    // 处理文件改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    // 教师查询
    searchTeacher(teacherName) {
      //TODO:教师查询
    },
    // 管理员修改教师密码
    changePassword(scope) {
      //TODO：管理员修改教师密码
    },
    // 管理员删除教师账号
    deleteAccount(scope) {
      //TODO：管理员删除教师账号
    },
    // 处理页数改变
    handlePageChange() {
      api.getTeacherList(this.pageData).then(res => {
        if (res.data.code === 20000) {
          this.pageData.total = res.data.data.list.total;
          this.teacherData = res.data.data.list.records;
        } else {
          console.log("获取教师名单失败");
        }
      })
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
  }
}
</script>

<style scoped>
.hang{
  display: flex;
}
.addButton{
  display: flex;
  justify-content: center;
}
</style>