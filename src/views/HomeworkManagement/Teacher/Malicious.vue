<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div style="margin-bottom: 10px">
      <span style="font-size: large;">bais值设置</span>
      <el-input v-model="bias" :placeholder=bias style="width: 100px;margin-left: 10px"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="zScore">确认检测</el-button>
    </div>
    <!--表格-->
    <el-table :data="tableData" border style="width:100%;" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <!--学生作业id-->
      <el-table-column label="学生作业id" prop="homeworkStudentId" width="80px" v-if="false"></el-table-column>
      <el-table-column label="互评id" prop="id" width="80px" v-if="false"></el-table-column>
      <el-table-column label="学生学号" prop="studentNumber" width="120px"></el-table-column>
      <el-table-column label="评分日期" prop="date" width="200px"></el-table-column>
      <el-table-column label="互评给分" prop="studentScoreId" width="100px"></el-table-column>
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
      bias:0.01,
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
    this.getData()
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  },
  methods: {
    // 获取恶意评分列表
    getData(){
      api.getMalicious(this.page).then(res=>{
        if(res.data.code===20000){
          this.tableData=res.data.data.list.records
          this.page.total=res.data.data.list.total
          if(this.tableData.length<=0){
            ElMessage.error('尚未检测')
          }else {
            ElMessage.success('加载成功')
          }
        }else {
          ElMessage.error('加载失败')
        }
      });
    },
    zScore(){
      //执行zScore分析
      api.zScore({homeworkNumber:this.homeworkNumber,bias:this.bias}).then(res=>{
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
  }
}
</script>

<style scoped>

</style>