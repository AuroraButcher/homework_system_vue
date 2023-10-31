<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-input @keyup.enter="search" v-model="homeworkName" placeholder="请输入作业名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="search(this.homeworkName)">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="作业编号" prop="id" width="100px"></el-table-column>
      <el-table-column label="作业名称" prop="name" width="200px"></el-table-column>
      <el-table-column label="截止时间" prop="endTime" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="showDetailInfo(scope)">详情</el-link>
          <!--教师显示-->
          <el-link type="primary" link style="margin-left: 10px" @click="changeHomework(scope)" v-show="role==='teacher'">修改</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="deleteHomework(scope)" v-show="role==='teacher'">删除</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="submitHomework(scope)" v-show="role==='student'">提交作业</el-link>
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
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessage, ElMessageBox} from "element-plus";
import {mapState} from "vuex";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "查看作业",
      homeworkName: '',
      key: 1,
      tableData: [
        {
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
        name: '',
        teacherName: '',
        currentPage: 1,
        pageSize: 10,
        total: 100,
      },
    }
  },
  // 展示作业
  created() {
    api.showCourse(this.page).then(response => {
      if (response.data.code === 20000) {
        //设置记录总数
        this.page.total = response.data.data.classInfo.total;
        //设置表数据
        this.tableData = response.data.data.classInfo.records;
      } else {
        ElMessage.error(response.data.message);
      }
    })
  },
  methods: {
    /*//搜索课程
    search(name) {
      this.page.name=name
      api.showCourse(this.page).then(response => {
        if (response.data.code === 20000) {
          //设置记录总数
          this.page.total = response.data.data.classInfo.total;
          //设置表数据
          this.tableData = response.data.data.classInfo.records;
        } else {
          ElMessage.error(response.data.message);
        }
      })
    },*/
    //展示详细信息
    showDetailInfo(scope) {
      this.$store.commit('setCourseNumber', scope.row.id);
      this.$router.push('/adminCourseInfo');
    },
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
      // console.log(row)
    },
  },
  computed: {
    ...mapState(['role'])
  }
}
</script>

<style scoped>

</style>