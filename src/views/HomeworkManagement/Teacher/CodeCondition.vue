<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <el-divider content-position="left">代码作业提交名单</el-divider>
    <el-table :data="similarData" border style="width:100%; margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="学号" prop="id" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="sendRemind(scope)">发送警告</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="checkSimilar" style="margin-top: 10px">代码作业查重</el-button>
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
  name: "homeworkCondition",
  data() {
    return {
      head: '作业提交情况',
      key: 1,
      ex:[],
      url:null,
      submitNumber:'',
      numberOfStudent:'',
      addExcellent:false,
      ExComment:'你好',
      similarData:[],
      params: {
        classID: null,
        homeworkID: null,
        pageNo: 1,
        pageSize: 10,
      }
    }
  },
  created() {
      this.getSimilarData();
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber','codeId']),

  },
  methods: {
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //TODO: 发送抄袭警告
    sendRemind(){
    },
    getSimilarData(){
      api.similarCode({id:this.codeId}).then(res=>{
        if(res.data.code===20000){
          this.url=res.data.data.url
          var key;
          for (key in res.data.data.info){
            this.similarData.push({id:key})
          }
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    checkSimilar(){
      console.log(this.url)
      window.open(this.url)
    }
  }
}
</script>

<style scoped>

</style>