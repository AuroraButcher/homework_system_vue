<template>
  <el-card>
    <template #header>
      <!--页头-->
      <page-header :component='head' />
    </template>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="题目名称" prop="name" width="200px">
        <template #default="scope">
          <el-link link @click="showDetailInfo(scope)">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="start" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="showDetailInfo(scope)" v-show="role === 'teacher' || role === 'student'">提交</el-link>
          <el-link type="primary" link style="margin-left: 20px" @click="showSubmissionList(scope)" v-show="role === 'teacher' || role === 'student'">提交记录</el-link>
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
        @current-change="handlePageChange()"
        :hide-on-single-page="false" />
  </el-card>
</template>
  
<script>
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import api from "../../../api/index.js";
import PageHeader from "../../Base/PageHeader.vue";

export default {
    name: "checkProgram",
    components: { PageHeader },
    data() {
        return {
            head: '题目列表',
            courseName: '',
            key: 1,
            tableData: [
                {
                    "id": null,
                    "title": null,
                    "start": null,
                    "end": null,
                }
            ],
            page: {
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
            api.getCodeListForStudent(this.page).then(respose => {
                    if (respose.data.code === 20000) {
                        this.page.total = respose.data.data.list.total;
                        this.tableData = respose.data.data.list.records;
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
        // TODO 搜索代码作业
        search(courseName) {
        },
      getDataForStudent(){
        api.getCodeListForStudent(this.page).then(response => {
          if (response.data.code === 20000) {
            /*console.log(this.page.currentPage)
            console.log(this.page.pageSize)
            console.log(response.data.data.list.records)*/
            this.page.total = response.data.data.list.total;
            this.tableData = response.data.data.list.records;
          } else {
            ElMessage.error(response.data.message);
          }
        })
      },
        //展示详细信息
        showDetailInfo(scope) {
            this.$store.commit('setCodeId', scope.row.id);
            this.$router.push('/viewCode');
        },
      //TODO 查看提交列表
        showSubmissionList(scope) {
            this.$store.commit('setCodeId', scope.row.id);
            this.$router.push("/submissionList")
        },
        // 处理页数改变
        handlePageChange() {
          this.getDataForStudent()
        },
        //获取当前的行数
        rowClassName({ row, rowIndex }) {
            //把每一行的索引放进row
            row.index = rowIndex;
        },
        // 弹出框
        addStudent(scope) {
            this.dialogFileVisible = true;
            this.$store.commit('setCourseNumber', scope.row.id);
        },
    },
    computed: {
        ...mapState(['role', 'courseNumber'])
    }
}
</script>
  
<style scoped>

</style>