<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--选择开始时间和截止时间-->
    <div class="selectHeader">
      <span style="font-weight: bold">设定起始与截止时间：</span>
      <div class="time-select">
        <el-date-picker
            type="datetimerange"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
        />
      </div>
      <span style="font-weight: bold;margin-left: 50px">允许多次提交：</span>
      <el-switch
          v-model="multiple"
          style="margin-left: 20px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
      />
      <el-button type="primary" style="width: 150px;margin-left: auto">发布作业</el-button>
    </div>
    <div class="editor" id="vditor"></div>
  </el-card>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import PageHeader from "../../Base/PageHeader.vue";
import {Apple, Check, Close} from "@element-plus/icons-vue";

export default {
  computed: {
    Close() {
      return Close
    },
    Check() {
      return Check
    }
  },
  components: {Apple, PageHeader},
  data() {
    return {
      head: "添加作业",
      multiple: null,
      contentEditor: {},
    }
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      //编辑器高度
      height: 470,
      //编辑器提示文本
      placeholder: '此处为作业内容……',
      //编辑器主题
      theme: 'classic',
      //根据markdown语法规则文字计数功能
      counter: {
        enable: true,
        type: 'markdown'
      },
      /*delay指定预览更新的延迟时间、
      hljs配置代码语法高亮的相关设置
      style代码高亮的主题
      lineNumber是否显示代码行号*/
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      // 指定Tab键所代表的字符
      tab: '\t',
      // 控制编辑器是否进入打字机模式
      typewriterMode: true,
      // 配置工具栏的相关设置，pin控制是否固定在页面顶部
      toolbarConfig: {
        pin: true
      },
      // 控制是否启用缓存策略
      cache: {
        enable: false
      },
      // 指定编辑器的语言模式，sv表示简单文本模式
      mode: 'sv',
      // 工具栏按钮配置
      toolbar: [
        'headings',//标题
        'bold',//加粗
        'italic',//斜体
        'strike',//删除线
        'link',//链接
        '|',
        'list',//无序列表
        'ordered-list',//有序列表
        'check',//复选框
        '|',
        'quote',//引用
        'line',//分隔线
        'code',//代码块
        'inline-code',//行内代码
        '|',
        'table',//表格
        '|',
        'undo',//撤销
        'redo',//重做
        '|',
        'edit-mode',//切换编辑模式
        'code-theme',//代码块主题预览
        '|',
        'both',//编辑&预览
        'preview',//预览
        'fullscreen',//全屏
        'export',//导出
      ],
    })
  },
  methods: {}
}
</script>

<style scoped>
.selectHeader {
  display: flex;
  align-items: center;

  .time-select {
    margin-left: 10px
  }
}

.editor {
  margin-top: 10px;
}
</style>