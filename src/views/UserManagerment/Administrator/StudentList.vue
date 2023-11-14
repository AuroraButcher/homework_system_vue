<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-input v-model="studentName" placeholder="请输入教师名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="searchTeacher(this.studentName)">搜索</el-button>
      <el-button type="primary" @click="addStudent">添加学生</el-button>
      <el-button type="primary" @click="showDialog">批量添加</el-button>
    </div>
    <!--目前学生名单-->
    <el-table :data="studentData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key" :default-sort="{ prop: 'number', order: 'ascending' }">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="学生学号" prop="number" width="120px" sortable></el-table-column>
      <el-table-column label="学生姓名" prop="name" width="120px"></el-table-column>
      <el-table-column fixed="right" label="操作">
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
  <!--批量添加学生的弹出框-->
  <el-dialog v-model="dialogFileVisible" title="批量添加学生">
    <el-upload action="/homework/addFile" :auto-upload="false" :file-list="fileList" :on-change="handleChange" :limit="1" accept=".xlsx,.xls">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button type="success" style="margin-left: 10px" @click="submitUpload">添加学生</el-button>
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
      head: "学生列表",
      dialogFileVisible: false,
      fileList: [],
      studentName: null,
      key: 1,
      studentData: [
        {
          id: null,
          number: null,
          password: null,
          name: null,
        }
      ],
      pageData: {
        pageNo: 1,
        pageSize: 10,
        total: null,
      },
    }
  },
  created() {
    api.getStudentList(this.pageData).then(res => {
      if (res.data.code === 20000) {
        this.pageData.total = res.data.data.page.total;
        this.studentData = res.data.data.page.records;
      } else {
        console.log("获取学生名单失败");
      }
    })
  },
  methods:{
    // 展示文件弹出框
    showDialog(){
      this.dialogFileVisible = true;
    },
    // 单个添加学生
    addStudent(){
      // TODO:单个学生添加
    },
    // 学生批量添加
    submitUpload() {
      const param = new FormData();
      this.fileList.forEach(val => {
        param.append("multipartFile", val.raw);
      })
      api.studentBulkImport(param).then(res => {
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
    // 根据姓名查询学生
    searchTeacher(studentName) {
      //TODO:查询学生
    },
    //管理员修改学生密码
    changePassword(scope) {
      //TODO 管理员修改学生密码
    },
    //管理员删除学生账号
    deleteAccount(scope) {
      //TODO 管理员删除学生账号
    },
    // 处理页数改变
    handlePageChange() {
      api.getStudentList(this.pageData).then(res => {
        if (res.data.code === 20000) {
          this.pageData.total = res.data.data.page.total;
          this.studentData = res.data.data.page.records;
        } else {
          console.log("获取学生名单失败");
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
</style>