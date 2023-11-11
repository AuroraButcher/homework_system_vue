<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--表格-->
    <el-table :data="tableData" border style="width:100%;" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <!--学生作业id-->
      <el-table-column label="ID" prop="id" width="80px" v-if="false"></el-table-column>
      <el-table-column label="学生学号" prop="studentNumber" width="120px"></el-table-column>
      <el-table-column label="分数" prop="score" width="100px"></el-table-column>
      <el-table-column label="提交时间" prop="date" width="200px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="showDetailInfo(scope)">详情</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import {ChatLineRound, Male} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  components: {Male, ChatLineRound, PageHeader},
  name: "homeworkCondition",
  data() {
    return {
      head: '作业提交情况',
      key: 1,
      submitNumber:'',
      numberOfStudent:'',
      tableData: [
        {
          id: '',
          studentNumber: '1',
          date: '',
          score:null,
        }
      ],
      params: {
        classID: null,
        homeworkID: null,
        pageNo: 1,
        pageSize: 10,
      }
    }
  },
  created() {
      if(this.homeworkNumber!==null&&this.courseNumber!==null){
        this.params.classID=this.courseNumber
        this.params.homeworkID=this.homeworkNumber
        api.homeworkCondition(this.params).then(res => {
          if (res.data.code === 20000) {
            this.tableData = res.data.data.homeworkInfo.records;
          }
        })
      }
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  },
  methods: {
    showDetailInfo(scope) {
      this.$store.commit('setHomeworkID', scope.row.id);
      this.$store.commit('setStudentNumber', scope.row.studentNumber);
      this.$router.push('/detailSubmitHomework');
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
  }
}
</script>

<style scoped>

</style>