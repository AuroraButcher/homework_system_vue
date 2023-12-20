<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px/"/>
      <el-table-column label="互评号" prop="id" width="100px"/>
      <el-table-column label="作业编号" prop="homeworkId" width="100px"/>
      <el-table-column label="学生作业编号" prop="homeworkStudentId" width="130px"/>
      <el-table-column label="评语" prop="content" width="500px"/>
      <el-table-column fixed="right" label="操作" width="300px">
        <template #default="scope">
          <el-link type="primary" link @click="detail(scope)">详情</el-link>
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

export default {
  name: "ViewExcellent",
  components: {PageHeader},
  data(){
    return{
      head:'优秀作业',
      key: 1,
      tableData:[],
      pageNo:1,
      pageSize:10,
    }
  },
  computed:{
    ...mapState(['homeworkNumber']),
  },
  methods:{
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    detail(scope){
      this.$store.commit('setHomeworkID',scope.row.homeworkStudentId)
      this.$router.push('/viewExcellentDetail')
    },
  },
  created() {

    api.getExcellent({homeworkNumber:this.homeworkNumber,pageNo:this.pageNo,pageSize:this.pageSize}).then(res=>{
      if(res.data.code===20000){
        this.tableData=res.data.data.page.records
      }else {
        ElMessage.error('加载失败')
      }
    })
  },

}
</script>

<style scoped>

</style>