<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <el-divider content-position="left">选择检测程度</el-divider>
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="zScore(this.bias1)">恶意</el-button>
      <el-button type="primary" @click="zScore(this.bias2)">比较恶意</el-button>
      <el-button type="primary" @click="zScore(this.bias3)">非常恶意</el-button>
    </div>
    <!--表格-->
    <el-table :data="tableData" border style="width:100%;" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <!--      <el-table-column label="互评id" prop="studentScoreId" width="100px"></el-table-column>-->
      <!--学生作业id-->
      <el-table-column label="学生作业id" prop="homeworkStudentId" width="80px" v-if="false"></el-table-column>
      <el-table-column label="ID" prop="id" width="80px" v-if="false"></el-table-column>
      <el-table-column label="批改人学号" prop="studentNumber" width="120px"></el-table-column>
      <el-table-column label="互评分数" prop="score" width="120px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="change(scope)">批改</el-link>
          <el-link type="primary" link @click="send(scope)" style="margin-left: 10px">发送警告</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--页码-->
    <el-pagination
        v-model:current-page="page.pageNo"
        v-model:page-size="page.pageSize"
        :total="page.total"
        @current-change="handlePageChange"
        :hide-on-single-page="true"/>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import {ElMessage} from "element-plus";
import AddExcellent from "./addExcellent.vue";

export default {
  inject:['reload'],  //注入依赖
  components: {AddExcellent, PageHeader},
  name: "Malicious",
  data() {
    return {
      head: '恶意评分检测',
      key: 1,
      bias1:0.8416,
      bias2:1.2815,
      bias3:1.6448,
      tableData: [
      ],
      page:{
        pageNo:1,
        pageSize:10,
        homeworkNumber:null,
        total:null,
      }
    }
  },
  created() {
    this.page.homeworkNumber=this.homeworkNumber
    this.zScore(this.bias1)
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber']),
  },
  methods: {
    // 获取恶意评分列表
    getData(){
      api.getMalicious(this.page).then(res=>{
        if(res.data.code===20000){
          this.tableData=res.data.data.list.records
          this.page.total=res.data.data.list.total
          for(let i=0;i<this.tableData.length;i++){
            api.stuGetCommentById(this.tableData[i].studentScoreId).then(res=>{
              this.tableData[i].score=res.data.data.score.score
            })
          }
        }else {
          ElMessage.error('加载失败')
        }
      });
    },
    zScore(bias){
      //执行zScore分析
      api.zScore({homeworkNumber:this.homeworkNumber,bias:bias}).then(res=>{
        if(res.data.code===20000){
          this.getData()
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    // 处理页数改变
    handlePageChange() {
      this.getData()
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    change(scope){
      this.$store.commit('setIndex',2)
      this.$store.commit('setScoreId',scope.row.studentScoreId)
      this.$router.push('/detailSubmitHomework');
    },
    send(scope){
      api.remindMalicious(scope.row.id).then(res=>{
        if(res.data.code===20000){
          ElMessage.success('发送成功')
        }else {
          ElMessage.error('发送失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>