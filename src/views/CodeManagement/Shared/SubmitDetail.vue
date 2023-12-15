<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>

    <h1>评测结果:</h1>
    <div v-if="status === 'WRONG_ANSWER'">
      <p>输入</p>
      <pre v-highlightjs><code class="javascript">{{ inputCase }}</code></pre>
      <hr>
      <p>期望的输出</p>
      <pre v-highlightjs><code class="javascript">{{ outputCase }}</code></pre>
      <hr>
      <p>实际输出</p>
      <pre v-highlightjs><code class="javascript">{{ userOutput }}</code></pre>
    </div>
    <div v-else-if="status === 'pending'">
      <p style="color: red">pending</p>
    </div>
    <div v-else-if="status === 'ACCEPTED'">
      <p style="color: green">恭喜通过此题</p>
    </div>
    <div v-else-if="status === 'COMPILE_ERROR'">
      <p style="color: red">编译错误!</p>
    </div>
    <div v-else-if="status === 'TIME_LIMIT_EXCEEDED'">
      <p style="color: red">时间超限！</p>
    </div>
    <div v-else-if="status === 'MEMORY_LIMIT_EXCEEDED'">
      <p style="color: red">内存超限！</p>
    </div>

    <h1>提交内容:</h1>
    <VAceEditor
        v-model:value="content"
        @init="editorInit"
        :options="editorOptions"
        lang="c_cpp" theme="textmate"
        style="width: 100%;height:500px;font-size:16px
        !important;"/>
  </el-card>
</template>
    
<script>
import PageHeader from "../../Base/PageHeader.vue";
import { mapState } from "vuex";
import api from "../../../api";
import { ElMessage } from "element-plus";
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
  data() {
    return {
      head: '作业提交详情',
      content: null,
      status: null,
      inputCase: null,
      outputCase: null,
      userOutput: null,
      numRange: null,
      submitCode: null,
      editorOptions: {
        readOnly: true, // 设置为只读
      },
    }
  },
  created() {
    api.getSubmitDetail(this.submissionId).then(res => {
      if (res.data.code === 20000) {
        this.content = res.data.data.info.content;
        this.inputCase = res.data.data.info.testcaseInput;
        this.outputCase = res.data.data.info.testcaseOutput;
        this.userOutput = res.data.data.info.userOutput;
        this.status = res.data.data.info.status;
      } else {
        ElMessage.error("加载失败");
      }
    })
  },
  methods: {},
  computed: {
    ...mapState(['studentNumber', 'role', 'index', 'courseNumber', "codeId", "submissionId"])
  }
}

</script>
  
  
<style scoped>

</style>