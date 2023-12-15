<template>
  <el-card>
    <template #header>
      <page-header :component='head'/>
    </template>

    <div>
      <el-button type="primary" @click="submitCode">提交代码</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="评测编号" type="index" width="100px"></el-table-column>
      <el-table-column label="评测时间" prop="date" width="200px"></el-table-column>
      <el-table-column label="评测状态" prop="name" width="120px">
        <template #default="scope">
          <p v-if="scope.row.status === 'ACCEPTED'" style="color: green">通过</p>
          <p v-else-if="scope.row.status === 'pending'" style="color: grey">正在评测</p>
          <p v-else-if="scope.row.status === 'WRONG_ANSWER'" style="color: RED">答案错误</p>
          <p v-else-if="scope.row.status === 'TIME_LIMIT_EXCEEDED'" style="color: RED">超过时间限制</p>
          <p v-else-if="scope.row.status === 'MEMORY_LIMIT_EXCEEDED'" style="color: RED">超过内存限制</p>
          <p v-else-if="scope.row.status === 'SEGMENTATION_FAULT'" style="color: RED">分段故障</p>
          <p v-else-if="scope.row.status === 'COMPILE_ERROR'" style="color: RED">编译错误</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="showDetailedSubmission(scope)">评测详情</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-model:current-page="page.pageNo"
        v-model:page-size="page.pageSize"
        :total="page.total"
        @current-change="handlePageChange()"
        :hide-on-single-page="false"/>
  </el-card>
</template>
  
<script>
import {ElMessage} from "element-plus";
import Cookies from "js-cookie";
import {mapState} from "vuex";
import api from "../../../api";
import PageHeader from "../../Base/PageHeader.vue";

export default {
  name: "checkProgram",
  components: {PageHeader},
  data() {
    return {
      head: '代码提交记录',
      key: 1,
      tableData: [
        {
          "id": null,
          "studentNumber": null,
          "status": null,
          "codeInfoId": null,
          "content": null,
          "date": null,
          "testcaseInput": null,
          "testcaseOutput": null,
        }
      ],
      page: {
        studentNumber: '',
        pageNo: 1,
        pageSize: 10,
        total: null,
        codeInfoId: null,
      },
    }
  },
  created() {
    this.getHistory();
  },
  methods: {
    // 获得提交评测记录
    getHistory() {
      this.page.studentNumber = Cookies.get('number');
      this.page.codeInfoId = this.codeId;
      api.getSubmitHistory(this.page).then(response => {
        if (response.data.code === 20000) {
          this.page.total = response.data.data.list.total;
          this.tableData = response.data.data.list.records;
        } else {
          console.log("查看提交列表失败");
        }
      })
    },
    // 获得该次提交的详情
    showDetailedSubmission(scope) {
      this.$store.commit('setSubmissionId', scope.row.id);
      this.$router.push('/submissionDetail');
    },
    // 处理数据改变
    handlePageChange() {
      this.getHistory();
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    // 提交代码界面
    submitCode() {
      this.$router.push("/submitCode");
    },
  },
  computed: {
    ...mapState(['role', 'courseNumber', 'codeId'])
  }
}
</script>
  
<style scoped>

</style>