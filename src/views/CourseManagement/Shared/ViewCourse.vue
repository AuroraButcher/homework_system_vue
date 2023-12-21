<template>
  <el-card>
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <div class="hang">
      <el-input v-model="courseName" @keyup.enter="search(this.courseName)" placeholder="请输入课程名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="search(this.courseName)">搜索</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="addCourse" v-if="role === 'administrator'">添加课程</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="课程编号" prop="id" width="100px" v-if="false"></el-table-column>
      <el-table-column label="课程名称" prop="name" width="200px">
        <template #default="scope">
          <el-link link @click="showDetailInfo(scope)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="课程教师" prop="teacherName" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="showHomework(scope)" v-show="role==='teacher'||role==='student'">作业列表</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="addStudent(scope)" v-show="role==='administrator' || role==='teacher'">导入学生名单</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="showStudentList(scope)" v-show="role==='teacher'||role==='administrator'">学生名单</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="changeCourse(scope)" v-show="role==='teacher'||role==='administrator'">修改</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="deleteCourse(scope)" v-show="role==='administrator'">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        :total="page.total"
        @current-change="handlePageChange"
        :hide-on-single-page="false"/>
  </el-card>
  <!--批量给课程添加学生的弹出框-->
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
import api from "../../../api/index.js"
import {ElMessage, ElMessageBox} from "element-plus";
import {mapState} from "vuex";
import Cookies from "js-cookie";

export default {
  name: "checkProgram",
  components: {PageHeader},
  data(){
    return {
      head: '查看课程',
      dialogFileVisible: false,
      fileList: [],
      courseName: '',
      key: 1,
      tableData: [
        {
          // 课程编号、课程简介、教师编号、课程名称、最大选修人数、现在的数量、教师名称
          "id": null,
          "info": null,
          "teacher": null,
          "name": null,
          "num": null,
          "currentNum": null,
          "teacherName": null
        }
      ],
      page: {
        courseName: null,
        teacherName: '',
        teacherNumber: '',
        studentNumber: '',
        currentPage: 1,
        pageSize: 10,
        total: null,
      },
    }
  },
  // 展示课程信息
  created() {
    if (this.role === 'administrator') {
      api.showCourse(this.page).then(response => {
        if (response.data.code === 20000) {
          this.page.total = response.data.data.classInfo.total;
          this.tableData = response.data.data.classInfo.records;
        } else {
          console.log("查看课程列表失败");
        }
      })
    } else if (this.role === 'student') {
      this.page.studentNumber = Cookies.get('number');
      api.studentShowCourse(this.page).then(response => {
        if (response.data.code === 20000) {
          this.page.total = response.data.data.classInfo.total;
          this.tableData = response.data.data.classInfo.records;
        } else {
          console.log("查看课程列表失败");
        }
      })
    } else {
      this.page.teacherNumber = Cookies.get('number');
      api.teacherShowCourse(this.page).then(response => {
        if (response.data.code === 20000) {
          this.page.total = response.data.data.classInfo.total;
          this.tableData = response.data.data.classInfo.records;
        } else {
          console.log("查看课程列表失败");
        }
      })
    }
  },
  methods: {
    //搜索课程
    search(courseName) {
      this.page.courseName = courseName;
      if (this.role === 'administrator') {
        api.showCourse(this.page).then(response => {
          if (response.data.code === 20000) {
            this.page.total = response.data.data.classInfo.total;
            this.tableData = response.data.data.classInfo.records;
          } else {
            console.log("查看课程列表失败");
          }
        })
      } else if (this.role === 'student') {
        this.page.studentNumber = Cookies.get('number');
        api.studentShowCourse(this.page).then(response => {
          if (response.data.code === 20000) {
            this.page.total = response.data.data.classInfo.total;
            this.tableData = response.data.data.classInfo.records;
          } else {
            console.log("查看课程列表失败");
          }
        })
      } else {
        this.page.teacherNumber = Cookies.get('number');
        api.teacherShowCourse(this.page).then(response => {
          if (response.data.code === 20000) {
            this.page.total = response.data.data.classInfo.total;
            this.tableData = response.data.data.classInfo.records;
          } else {
            console.log("查看课程列表失败");
          }
        })
      }
    },
    //展示详细信息
    showDetailInfo(scope) {
      this.$store.commit('setCourseNumber', scope.row.id);
      this.$router.push('/courseInfo');
    },
    // 修改课程信息
    changeCourse(scope) {
      this.$store.commit('setCourseNumber', scope.row.id);
      this.$router.push('/changeCourseInfo');
    },
    //删除课程
    deleteCourse(scope) {
      ElMessageBox.confirm(
          '你确定你要删除吗?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
            api.deleteCourse(scope.row.id).then(response => {
              if (response.data.code === 20000) {
                ElMessageBox.alert("删除成功", '消息', {
                  confirmButtonText: 'OK',
                  callback: action => {
                    if (action === 'confirm') {
                      this.search()
                    }
                  }
                })
              } else {
                ElMessageBox.alert("删除失败", '消息', {
                  confirmButtonText: 'OK',
                })
              }
            })
          })
          .catch(() => {
          })
    },
    // 处理页数改变
    handlePageChange() {
      api.showCourse(this.page).then(res => {
        if (res.data.code === 20000) {
          this.page.total = res.data.data.classInfo.total;
          this.tableData = res.data.data.classInfo.records;
        } else {
          ElMessage.error(res.data.message);
        }
      })
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    // 展示作业列表
    showHomework(scope) {
      this.$store.commit('setCourseNumber', scope.row.id);
      if (this.role === 'teacher') {
        this.$router.push('/teaViewHomework');
      } else {
        this.$router.push('/stuViewHomework');
      }
    },
    // 弹出框
    addStudent(scope) {
      this.dialogFileVisible = true;
      this.$store.commit('setCourseNumber', scope.row.id);
    },
    // 给课程添加学生名单
    submitUpload() {
      const param = new FormData();
      param.append("classId", this.courseNumber);
      this.fileList.forEach(val => {
        param.append("multipartFile", val.raw);
      })
      api.courseImportStudent(param).then(res => {
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
    // 添加课程
    addCourse() {
      this.$router.push('/addCourse');
    },
    // 获得选修学生的名单
    showStudentList(scope) {
      this.$store.commit('setCourseNumber', scope.row.id);
      if (this.role === 'teacher') {
        this.$router.push('/teaShowCourseStudentList');
      } else {
        this.$router.push('/adminShowCourseStudentList');
      }
    }
  },
  computed:{
    ...mapState(['role', 'courseNumber'])
  }
}
</script>

<style scoped>
.hang {
  display: flex;
}
</style>