<template>
  <el-card>
    <template #header>
      <page-header :component="head"></page-header>
    </template>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="作业编号" prop="id" width="100px" v-if="false"></el-table-column>
      <el-table-column label="作业名称" prop="name" width="200px"></el-table-column>
      <el-table-column label="分数" prop="grade" width="200px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="checkHomework(scope)">互评打分</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Cookie from "js-cookie";
export default {
  name: "EvaluateHomework",
  components: {PageHeader},
  data(){
    return{
      head:'作业互评',
      tableData:[{
        id:null,
        name:123,
        grade:100,
      },]
    }
  },
  created() {
  },
  computed:{},
  methods:{
    checkHomework(scope){
      //TODO 进入互评打分界面
    }
  },
}
</script>

<style scoped>

</style>