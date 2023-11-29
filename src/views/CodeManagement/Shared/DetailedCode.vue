<template>
    <el-card>
      <template #header>
        <page-header :component="head"/>
      </template>
      <vue-mathjax :formula="content" />
      <!-- <vue-mathjax :famula="content"></vue-mathjax> -->
      <h4>输入格式</h4>
      <vue-mathjax :formula="inputFormat" />
      <h4>输出格式</h4>
      <vue-mathjax :formula="outputFormat" />
      <h4>输入</h4>
      <pre v-highlightjs><code class="javascript">{{ inputCase }}</code></pre>
      <h4>输出</h4>
      <pre v-highlightjs><code class="javascript">{{ outputCase }}</code></pre>
    
      <VAceEditor
    v-model:value="subimitCode"
    @init="editorInit"
    lang="c_cpp"
    theme="textmate"
    style="height: 300px" />
    </el-card>
 </template>
  
  <script>
  import PageHeader from "../../Base/PageHeader.vue";
  import {mapState} from "vuex";
  import api from "../../../api";
  import {ElMessage} from "element-plus";
  import { VAceEditor } from 'vue3-ace-editor';
  import ace from 'ace-builds'; 


  
  export default {
    setup() {
    ace.config.set(
      "basePath", 
      "https://cdn.jsdelivr.net/npm/ace-builds@" + ace.version + "/src-noconflict/"
    );
  },
    name: "DetailSubmitHomework",
    components: {PageHeader, VAceEditor},
    created() {
      api.getCodeInfo(2).then(res=>{
        if(res.data.code === 20000)
        {
            this.content = res.data.data.题面.content
            this.inputCase = res.data.data.题面.inputCase
            this.inputFormat = res.data.data.题面.inputFormat
            this.outputCase = res.data.data.题面.outputCase
            this.outputFormat = res.data.data.题面.outputFormat
            this.numRange = res.data.data.题面.numRange
        }
        else
        {
            ElMessage.error("加载失败");
        }
      })
    },
    data() {
      return {
        head: '作业提交详情',

        content:null,
        inputFormat:null,
        inputCase:null,
        outputFormat:null,
        outputCase:null,
        numRange:null,

        subimitCode:null,

        downloadData: {
          id: null,
          classID: null,
          downloadFileName: null,
          studentNumber:null,
        }
      }
    },
    methods: {
    },
    computed:{
      ...mapState(['homeworkNumber','homeworkID','studentNumber','role','index','courseNumber'])
    }
  }
  
  </script>


  <style scoped>
  .textarea{
    width: 50%;
  }
  </style>