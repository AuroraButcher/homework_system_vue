<template>
  <el-card>
    <template #header>
      <page-header :component="head"></page-header>
    </template>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="作业编号" prop="id" width="100px" v-if="false"></el-table-column>
      <el-table-column label="互评编号" prop="evaluateId" width="100px" v-if="false"></el-table-column>
      <el-table-column label="作业名称" prop="name" width="200px">
        <template #default="scope">
          作业{{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="评分情况" prop="grade" width="200px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="checkHomework(scope)">
            {{scope.row.grade==='未评分'?'互评作业':'修改评分'}}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
<!--  TODO:没有页码-->
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import Cookie from "js-cookie";
import {ElMessage} from "element-plus";
export default {
  name: "EvaluateHomework",
  components: {PageHeader},
  data(){
    return{
      head:'作业互评',
      studentNumber:Cookie.get('number'),
      Data:{
        id:null,
        evaluateId:null,
        name:null,
        grade:null,
      },
      tableData:[],
      getList:{
        studentNumber:null,
        homeworkNumber:null,
      }
    }
  },
  created() {
    this.getList.studentNumber = this.studentNumber;
    this.getList.homeworkNumber = this.homeworkNumber;
    api.stuGetEvaluateList(this.getList).then(res=>{
      if(res.data.code===20000){
        let i;
        for(i = 0; i<res.data.data["未评分-评分表"].length; i++){
          this.tableData.push({
            evaluateId:res.data.data["未评分-评分表"][i],
            id: res.data.data["未评分-作业表"][i],
            grade:'未评分',
          })
        }
        for(i=0;i<res.data.data["评分-评分表"].length;i++){
          this.tableData.push({
            evaluateId:res.data.data["评分-评分表"][i],
            id: res.data.data["评分-作业表"][i],
            grade:'已互评',
          })
        }
      }else {
        console.log("获取互评列表失败");
      }
    })
  },
  computed:{
    ...mapState(['homeworkNumber'])
  },
  methods:{
    checkHomework(scope){
      this.$store.commit('setIndex',scope.row.evaluateId)
      this.$store.commit('setHomeworkID',scope.row.id)
      this.$router.push('/detailSubmitHomework');
    }
  },
}
</script>

<style scoped>

</style>