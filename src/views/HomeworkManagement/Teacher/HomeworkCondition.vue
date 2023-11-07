<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--统计板-->
    <div>
      <el-row style="text-align: center;">
        <el-col :span="6">
          <el-statistic title="应交人数" :value="50"/>
        </el-col>
        <el-col :span="6">
          <el-statistic title="实交人数" :value="24"/>
        </el-col>
        <el-col :span="6">
          <el-statistic title="未交人数" :value="26"/>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="24">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                提交率
                <el-icon style="margin-left: 4px" :size="12">
                  <Male/>
                </el-icon>
              </div>
            </template>
            <template #suffix>/50</template>
          </el-statistic>
        </el-col>
      </el-row>
    </div>
    <!--表格-->
    <el-table :data="tableData" border style="width:100%;margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="ID" prop="id" width="80px"></el-table-column>
      <el-table-column label="学生学号" prop="studentNumber" width="120px"></el-table-column>
      <el-table-column label="是否提交" prop="submit" width="100px"></el-table-column>
      <el-table-column label="分数" prop="grade" width="100px"></el-table-column>
      <el-table-column label="提交时间" prop="date" width="200px"></el-table-column>
      <!--      <el-table-column label="分数" prop="result" width="200px" v-show="role==='student'"></el-table-column>-->
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

export default {
  components: {Male, ChatLineRound, PageHeader},
  name: "homeworkCondition",
  data() {
    return {
      head: '作业提交情况',
      tableData: [
        {
          id: '',
          studentNumber: '1',
          date: '',
        }
      ],
      params:{
        classID:null,
        homeworkID:null,
        pageNo:1,
        pageSize:10,
      }
    }
  },
  created() {
      if(this.homeworkNumber!==null&&this.courseNumber!==null){
        this.params.classID=this.courseNumber
        this.params.homeworkID=this.homeworkNumber
        api.homeworkCondition(this.params).then(res=>{
          if(res.data.code===20000){
            this.tableData = res.data.data.homeworkInfo.records;
          }
        })
      }
  },
  computed:{
    ...mapState(['homeworkNumber','courseNumber'])
  },
  methods:{
    showDetailInfo(scope){
      this.$store.commit('setHomeworkID', scope.row.id);
      this.$store.commit('setStudentNumber', scope.row.studentNumber);
      console.log(scope.row.id)
      this.$router.push('/detailSubmitHomework');
    }
  }
}
</script>

<style scoped>

</style>