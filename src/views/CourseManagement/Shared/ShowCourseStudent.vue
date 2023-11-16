<template>
  <el-card style="height: 100%">
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <el-table :data="studentInfo" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="学号" prop="number" width="200px"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
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
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import {mapState} from "vuex";
import api from "../../../api/index.js"
import {ElMessage} from "element-plus";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "学生名单",
      key: 1,
      studentInfo: [
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
        courseId: null,
      }
    }
  },
  created() {
    this.pageData.courseId = this.courseNumber;
    api.getCourseStudentList(this.pageData).then(res => {
      if (res.data.code === 20000) {
        this.pageData.total = res.data.data.page.total;
        this.studentInfo = res.data.data.page.records;
      }
    })
  },
  methods: {
    // 处理页数改变
    handlePageChange() {
      api.getCourseStudentList(this.pageData).then(res => {
        if (res.data.code === 20000) {
          this.pageData.total = res.data.data.page.total;
          this.studentInfo = res.data.data.page.records;
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
  },
  computed: {
    ...mapState(['courseNumber'])
  }
}
</script>

<style scoped>

</style>