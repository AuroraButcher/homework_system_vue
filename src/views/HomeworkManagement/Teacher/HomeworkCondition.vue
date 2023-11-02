<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
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

export default {
  components: {PageHeader},
  name: "homeworkConditon",
  data(){
    return{
      head:'作业提交情况',
      tableData:[
        {
          id:'',
          studentNumber:'1',
          date:'',
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
            this.tableData=res.data.data.homeworkInfo.records
          }
        })
      }
  },
  computed:{
    ...mapState(['homeworkNumber','courseNumber'])
  },
  methods:{
    showDetailInfo(scope){

    }
  }
}
</script>

<style scoped>

</style>