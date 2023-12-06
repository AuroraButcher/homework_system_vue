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
      <el-table-column fixed="right" label="提交记录">
        <template #default="scope">
          <el-link type="primary" link @click="showSubmissionList(scope)" v-show="role === 'teacher' || role === 'student'">提交记录</el-link>
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
  // 展示代码作业信息
  created() {

  },
  methods: {
    // 处理页数改变
    handlePageChange(){

    },
    // 展示代码作业信息

  },
  computed: {
    ...mapState(['role', 'courseNumber'])
  }
}
</script>
  
<style scoped>

</style>