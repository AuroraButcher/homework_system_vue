<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--题目-->
    <el-descriptions :column="1" border>
      <el-descriptions-item label="题目:">
        {{ codeInformation.title }}
      </el-descriptions-item>
      <el-descriptions-item label="题目内容:">
        <vue-mathjax :formula="codeInformation.content"/>
      </el-descriptions-item>
      <el-descriptions-item label="数值范围:">
        <vue-mathjax :formula="codeInformation.numRange"/>
      </el-descriptions-item>
      <el-descriptions-item label="输入格式:">
        <vue-mathjax :formula="codeInformation.inputFormat"/>
      </el-descriptions-item>
      <el-descriptions-item label="输出格式:">
        <vue-mathjax :formula="codeInformation.outputFormat"/>
      </el-descriptions-item>
      <el-descriptions-item label="输入样例:">
        <pre v-highlightjs><code class="javascript">{{ codeInformation.inputCase }}</code></pre>
      </el-descriptions-item>
      <el-descriptions-item label="输出样例:">
        <pre v-highlightjs><code class="javascript">{{ codeInformation.outputCase }}</code></pre>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import {mapState} from "vuex";
import api from "../../../api";
import {ElMessage} from "element-plus";
import {VAceEditor} from 'vue3-ace-editor';
import ace from 'ace-builds';

export default {
  setup() {
    ace.config.set(
        "basePath",
        "https://cdn.jsdelivr.net/npm/ace-builds@" + ace.version + "/src-noconflict/"
    );
  },
  name: "DetailedCode",
  components: {PageHeader, VAceEditor},
  data() {
    return {
      head: '代码作业详情',
      codeInformation: {
        id: null,
        acwId: null,
        start: null,
        end: null,
        inputFormat: null,
        outputFormat: null,
        inputCase: null,
        outputCase: null,
        numRange: null,
        content: null,
        title: null,
      },
    }
  },
  created() {
    // 获取题面信息
    api.getCodeInfo(this.codeId).then(res => {
      if (res.data.code === 20000) {
        this.codeInformation = res.data.data.题面;
      } else {
        ElMessage.error("加载失败");
      }
    })
  },
  methods: {},
  computed: {
    ...mapState(["codeId"])
  }
}
</script>


<style scoped>
.textarea {
  width: 50%;
}
</style>