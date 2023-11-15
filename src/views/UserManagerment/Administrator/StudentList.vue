<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-input @keyup.enter="searchStudent" v-model="pageData.studentName" placeholder="请输入学生姓名" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="searchStudent">搜索</el-button>
      <el-button type="primary" @click="addStudentDialog">添加学生</el-button>
      <el-button type="primary" @click="showDialog">批量添加</el-button>
    </div>
    <!--目前学生名单-->
    <el-table :data="studentData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key" :default-sort="{ prop: 'number', order: 'ascending' }">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="学生学号" prop="number" width="120px" sortable></el-table-column>
      <el-table-column label="学生姓名" prop="name" width="120px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="changeDialog(scope)">修改密码</el-link>
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
  <el-dialog v-model="dialogAddVisible" title="单个添加学生" style="width: 400px">
    <el-form :model="addForm" status-icon :rules="addRules" ref="addForm" label-position="left" label-width="70px">
      <el-form-item label="学号：" prop="number">
        <el-input type="text" v-model="addForm.number" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="addName">
        <el-input type="text" v-model="addForm.addName" style="width: 300px"></el-input>
      </el-form-item>
    </el-form>
    <div class="addButton">
      <el-button type="primary" @click="addStudent(addForm)" style="width: 150px;">添加</el-button>
    </div>
  </el-dialog>

  <!--管理员修改密码弹出框-->
  <el-dialog v-model="dialogChangeVisible" title="修改密码" style="width: 400px">
    <el-form :model="changeForm" status-icon :rules="changeRules" ref="changeForm" label-position="left" label-width="100px">
      <el-form-item label="学号：" prop="number">
        <el-input type="text" v-model="changeForm.number" style="width: 300px" :placeholder="changeForm.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="password">
        <el-input type="password" v-model="changeForm.password" style="width: 300px"></el-input>
      </el-form-item>
    </el-form>
    <div class="addButton">
      <el-button type="primary" @click="changePassword(changeForm)" style="width: 150px;">修改</el-button>
    </div>
  </el-dialog>

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
      // 弹出框：单个添加、批量添加、修改密码
      dialogAddVisible:false,
      dialogFileVisible: false,
      dialogChangeVisible:false,
      fileList: [],
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
        studentName: '',
        total: null,
      },
      // 添加表单与规则
      addForm:{
        number:null,
        addName:null,
      },
      addRules:{
        number: [
          {required: true, message: "学号不能为空！", trigger: "change"},
        ],
        addName: [
          {required: true, message: "姓名不能为空！", trigger: "change"},
        ],
      },
      // 修改表单与规则
      changeForm:{
        number:null,
        password:null,
      },
      changeRules:{
        number: [
          {required: true, message: "学号不能为空！", trigger: "change"},
        ],
        password: [
          {required: true, message: "密码不能为空！", trigger: "change"},
        ],
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
    // 单个添加弹出框
    addStudentDialog(){
      this.dialogAddVisible = true;
    },
    // 修改密码弹出框
    changeDialog(scope){
      this.dialogChangeVisible = true;
      this.changeForm.number = scope.row.number;
    },
    // 单个添加学生
    addStudent(addForm){
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          api.addSingleStudent(addForm).then(res => {
            if(res.data.code === 20000){
              ElMessage.success("修改成功");
              this.dialogAddVisible = false;
              this.$refs.addForm.resetFields();
              this.searchStudent();
            }else{
              ElMessage.error("修改失败");
            }
          })
        }else{
          ElMessage.error("非法请求");
        }
      })
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
          this.searchStudent();
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
    searchStudent() {
      api.getStudentList(this.pageData).then(res => {
        if (res.data.code === 20000) {
          this.pageData.total = res.data.data.page.total;
          this.studentData = res.data.data.page.records;
        } else {
          console.log("获取学生名单失败");
        }
      })
    },
    //管理员修改学生密码
    changePassword(changeForm) {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          api.changeStudentPassword(changeForm).then(res => {
            if(res.data.code === 20000){
              ElMessage.success("修改成功");
              this.dialogChangeVisible = false;
              this.$refs.changeForm.resetFields();
            }else{
              ElMessage.error("修改失败");
            }
          })
        }else{
          ElMessage.error("非法请求");
        }
      })
    },
    //管理员删除学生账号
    deleteAccount(scope) {
      api.adminDeleteStudent(scope.row.number).then(res => {
        if(res.data.code === 20000){
          ElMessage.success("删除成功");
          this.searchStudent();
        }else{
          ElMessage.success("删除失败");
        }
      })
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
.addButton{
  display: flex;
  justify-content: center;
}
</style>