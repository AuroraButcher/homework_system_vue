<template>
  <el-card>
    <template #header>
      <page-header :component="head" />
    </template>
    <vue-mathjax :formula="content" />
    <!-- <vue-mathjax :famula="content"></vue-mathjax> -->
    <h4>输入格式</h4>
    <vue-mathjax :formula="inputFormat" />
    <h4>输出格式</h4>
    <vue-mathjax :formula="outputFormat" />
    <h4>输入样例</h4>
    <pre v-highlightjs><code class="javascript">{{ inputCase }}</code></pre>
    <h4>输出样例</h4>
    <pre v-highlightjs><code class="javascript">{{ outputCase }}</code></pre>

    <p>请使用C/C++进行编程</p>

    <hr>
    <VAceEditor v-model:value="subimitCode" @init="editorInit" lang="c_cpp" theme="textmate" style="width: 90%;height: 500px; font-size: 16px !important;" />
    
    <hr>
    <el-button @click="submit(this.studentNumber, this.subimitCode, codeId)">评测结果</el-button>

 </el-card>
</template>
  
<script>
import PageHeader from "../../Base/PageHeader.vue";
import { mapState } from "vuex";
import api from "../../../api";
import { ElMessage } from "element-plus";
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';
import Cookies from "js-cookie";



export default {
  setup() {
    ace.config.set(
      "basePath",
      "https://cdn.jsdelivr.net/npm/ace-builds@" + ace.version + "/src-noconflict/"
    );
  },
  name: "DetailedCode",
  components: { PageHeader, VAceEditor },
  created() {
    this.studentNumber = Cookies.get('number');
    api.getCodeInfo(this.codeId).then(res => {
      if (res.data.code === 20000) {
        this.content = res.data.data.题面.content
        this.inputCase = res.data.data.题面.inputCase
        this.inputFormat = res.data.data.题面.inputFormat
        this.outputCase = res.data.data.题面.outputCase
        this.outputFormat = res.data.data.题面.outputFormat
        this.numRange = res.data.data.题面.numRange
      }
      else {
        ElMessage.error("加载失败");
      }
    })
  },
  data() {
    return {
      head: '作业提交详情',

      content: null,
      inputFormat: null,
      inputCase: null,
      outputFormat: null,
      outputCase: null,
      numRange: null,

      subimitCode: null,
      studentNumber: null,
    }
  },
  methods: {
    submit(studentNumber, submitCode, codeId){
      api.submitCode(studentNumber, submitCode, codeId)
      this.$router.push("/submissionList")
    }
  },
  computed: {
    ...mapState(['homeworkNumber', 'homeworkID', 'studentNumber', 'role', 'index', 'courseNumber', "codeId"])
  }
}

</script>


<style scoped>
.textarea {
  width: 50%;
}
</style>