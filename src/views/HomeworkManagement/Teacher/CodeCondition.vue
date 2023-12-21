<template>
  <el-dialog v-model="dialogVisible" title="Code" width="50%" >
    <VAceEditor
        v-model:value="content"
        @init="editorInit"
        :options="editorOptions"
        lang="c_cpp" theme="textmate"
        style="width: 100%;height:500px;font-size:16px
        !important;"/>
  </el-dialog>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <el-divider content-position="left">代码作业提交名单</el-divider>
    <el-table :data="similarData" border style="width:100%; margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="学号" prop="studentNumber" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="readCode(scope)">查看作业</el-link>
          <el-link type="primary" link @click="sendRemind(scope)" style="margin-left: 10px">发送警告</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">代码作业查重</el-divider>
    <el-table :data="jplagData" border style="width:100%; margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="作业1" prop="first_submission" width="150px"></el-table-column>
      <el-table-column label="作业2" prop="second_submission" width="150px"></el-table-column>
      <el-table-column label="相似度" width="150px">
        <template #default="scope">
          <span v-if="scope.row.similarity>0.9" style="color: red; font-weight: bold">相似度超过90%</span>
          <span v-else-if="scope.row.similarity>0.8" style="color: rgb(255,115,0); font-weight: bold">相似度超过80%</span>
          <span v-else-if="scope.row.similarity>0.7" style="color: orange; font-weight: bold">相似度超过70%</span>
          <span v-else style="color: rgba(255,196,0,0.85); font-weight: bold">相似度不高于70%</span>
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
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

export default {
  setup() {
    ace.config.set(
        "basePath",
        "https://cdn.jsdelivr.net/npm/ace-builds@" + ace.version + "/src-noconflict/"
    );
  },
  inject:['reload'],  //注入依赖
  components: {AddExcellent, PageHeader,VAceEditor},
  name: "homeworkCondition",
  data() {
    return {
      head: '作业提交情况',
      key: 1,
      ex:[],
      url:null,
      submitNumber:'',
      content:'',
      dialogVisible:false,
      numberOfStudent:'',
      addExcellent:false,
      ExComment:'你好',
      similarData:[],
      jplagData:[],
      editorOptions: {
        readOnly: true, // 设置为只读
      },
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
    sendRemind(scope){
      api.codeRemind({studentNumber:scope.row.id,id:this.codeId}).then(res=>{
        if(res.data.code===20000){
          ElMessage.success('发送成功')
        }else {
          ElMessage.error('发送失败')
        }
      })
    },
    getSimilarData(){
      api.getStudentCode(this.codeId).then(res=>{
        if(res.data.code===20000){
          console.log(res.data.data)
          this.similarData=res.data.data.info
        }else {
          ElMessage.error('加载失败')
        }
      })
      api.similarCode({id:this.codeId}).then(res=>{
        if(res.data.code===20000){
          this.url=res.data.data.url
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    getJplagData(){
      api.jplagSimilar({id:this.codeId}).then(res=>{
        if(res.data.code===20000){
          this.jplagData=res.data.data.jplag
        }else {
          ElMessage.error('加载失败')
        }
      })
    },
    checkSimilar(){
      console.log(this.url)
      window.open(this.url)
    },
    readCode(scope){
      this.content=scope.row.content
      this.dialogVisible=true
    }
  }
}
</script>

<style scoped>

</style>