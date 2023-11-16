<template>
  <add-excellent v-model="addExcellent" @addExcellent="addExcellent=false"></add-excellent>
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
          <el-link type="primary" link @click="showDetailInfo(scope)">批改</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="setExHomework(scope)">
            {{ this.ex[scope.$index]===0?'设置优秀作业':'修改优秀作业状态' }}
          </el-link>
<!--       TODO:   优秀作业状态-->
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import {ElMessage} from "element-plus";
import AddExcellent from "./addExcellent.vue";

export default {
  components: {AddExcellent, PageHeader},
  name: "homeworkCondition",
  data() {
    return {
      head: '作业提交情况',
      key: 1,
      ex:[],
      submitNumber:'',
      numberOfStudent:'',
      addExcellent:false,
      ExComment:'你好',
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
    // 获取提交作业列表
    if(this.homeworkNumber!==null&&this.courseNumber!==null){
      this.params.classID=this.courseNumber
      this.params.homeworkID=this.homeworkNumber
      api.homeworkCondition(this.params).then(res => {
        if (res.data.code === 20000) {
          this.tableData = res.data.data.homeworkInfo.records;
          this.ex=res.data.data.excellent
        }
      })
    }
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  },
  methods: {
    // 提交作业详情
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
    //设置优秀作业
    setExHomework(scope){
      this.$store.commit('setHomeworkID',scope.row.id)
      this.addExcellent=true
    }
  }
}
</script>

<style scoped>

</style>