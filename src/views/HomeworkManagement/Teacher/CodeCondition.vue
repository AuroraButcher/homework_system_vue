<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <el-divider content-position="left">代码评测通过名单</el-divider>
    <el-table :data="similarData" border style="width:100%; margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="学号" prop="studentNumber" width="100px">
        <template #default="scope">
          <el-link link @click="showContent(scope)">{{ scope.row.studentNumber }}</el-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" v-if="false">
        <template #default="scope">
          <el-link type="primary" link @click="sendRemind(scope)">发送警告</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-divider content-position="left">代码作业查重</el-divider>
    <el-table :data="jplagData" border style="width:100%; margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="作业1" prop="first_submission" width="150px"></el-table-column>
      <el-table-column label="作业2" prop="second_submission" width="150px"></el-table-column>
      <el-table-column label="相似度" width="100px">
        <template #default="scope">
          <span v-if="scope.row.similarity>0.9" style="color: red; font-weight: bold">非常相似</span>
          <span v-else-if="scope.row.similarity>0.8" style="color: rgb(255,115,0); font-weight: bold">很相似</span>
          <span v-else-if="scope.row.similarity>0.7" style="color: orange; font-weight: bold">一般相似</span>
          <span v-else style="color: rgba(255,196,0,0.85); font-weight: bold">有点相似</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="checkSimilar" style="margin-top: 10px">代码作业查重可视化对比</el-button>
  </el-card>

  <el-dialog v-model="isCodeModalVisible" title="详情">
    <VAceEditor
        v-model:value="selectedStudentCode"
        @init="editorInit"
        :options="editorOptions"
        lang="c_cpp" theme="textmate"
        style="width: 100%;height:500px;font-size:16px
        !important;"/>
  </el-dialog>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import {ElMessage} from "element-plus";
import AddExcellent from "./addExcellent.vue";
import { VAceEditor } from 'vue3-ace-editor';


export default {
  inject:['reload'],  //注入依赖
  components: {AddExcellent, PageHeader, VAceEditor},
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
      isCodeModalVisible: false,
      selectedStudentCode:null,
      similarData:[
      ],
      jplagData:[],
      params: {
        classID: null,
        homeworkID: null,
        pageNo: 1,
        pageSize: 10,
      }
    }
  },
  created() {
      this.getAc();
      this.getSimilarData();
      this.getJplagData()
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
          // var key;
          // for (key in res.data.data.info){
          //   this.similarData.push({id:key})
          // }
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    getJplagData(){
      api.jplagSimilar({id:this.codeId}).then(res=>{
        if(res.data.code===20000){
          this.jplagData=res.data.data.jplag
          console.log(res.data.data)
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    getAc(){
      api.getAc({id:this.codeId}).then(res => {
        if(res.data.code===20000){
            this.similarData = res.data.data.info
            console.log(res.data.data)
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    checkSimilar(){
      console.log(this.url)
      window.open(this.url)
    },
    showContent(scope) {
      console.log(1)
      this.selectedStudentCode = scope.row.content;
      this.isCodeModalVisible = true;
    },

  }
}
</script>

<style scoped>

</style>