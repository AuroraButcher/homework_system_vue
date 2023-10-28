<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div id="vditor"></div>
    <p>设定开始与截止时间</p>
    <div class="block">
      <el-date-picker
          v-model="value2"
          type="datetimerange"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
      />
    </div>
    <el-button type="primary" style="margin-top: 10px">发布作业</el-button>
  </el-card>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import PageHeader from "../../Base/PageHeader.vue";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "添加作业",
      contentEditor: {},
    }
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv',
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        // 'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        // 'content-theme',
        'code-theme',
        'export',
        {
          name: 'more',
          toolbar: [
            'fullscreen',
            'both',
            'preview',
            'info',
            'help',
          ],
        }],
    })
  }
}
</script>

<style scoped>

</style>