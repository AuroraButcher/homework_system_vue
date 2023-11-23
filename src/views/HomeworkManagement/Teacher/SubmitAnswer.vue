<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--编辑器-->
    <div class="editor" id="vditor"></div>
    <!--附件-->
    <div>
      <el-divider content-position="left">提交附件</el-divider>
      <el-upload action="/homework/addFile" :auto-upload="false" :file-list="fileList" :on-change="handleChange">
        <template #trigger>
          <el-button style="width: 150px" type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div style="margin-top: 10px">
            文件小于5Mb
          </div>
        </template>
      </el-upload>
    </div>
    <el-button type="primary" style="width: 150px;margin-top: 10px" @click="submitAnswer">发布答案</el-button>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Vditor from "vditor";
import {mapState} from "vuex";
import {ElMessage} from "element-plus";
import api from "../../../api";

export default {
  components: {PageHeader, ElMessage},
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
      // delay指定预览更新的延迟时间、hljs配置代码语法高亮的相关设置、style代码高亮的主题、lineNumber是否显示代码行号
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
  data() {
    return {
      head: "上传答案",
      contentEditor: {},
      answerData: {
        homeworkId: null,
        content: null,
      },
      fileList: [],
    }
  },
  methods: {
    submitAnswer() {
      if (this.fileList.length !== 0) {
        //有附件
        if (this.contentEditor.getValue().length === 1 || this.contentEditor.getValue() === null || this.contentEditor.getValue() === '') {
          // 没有文字
          this.answerData.homeworkId = this.homeworkNumber;
          this.answerData.content = "";
          api.addAnswer(this.answerData).then(res => {
            if (res.data.code === 20000) {
              const param = new FormData();
              param.append('classId', this.courseNumber);
              param.append('homeworkId', this.homeworkNumber);
              this.fileList.forEach(val => {
                param.append("multipartFile", val.raw);
              })
              api.addAnswerFile(param).then(res => {
                if (res.data.code === 20000) {
                  ElMessage.success("上传成功");
                } else {
                  ElMessage.error("上传失败");
                }
              })
            } else {
              ElMessage.error("上传失败");
            }
          })
        } else {
          // 有文字
          this.answerData.homeworkId = this.homeworkNumber;
          this.answerData.content = this.contentEditor.getValue();
          api.addAnswer(this.answerData).then(res => {
            if (res.data.code === 20000) {
              const param = new FormData();
              param.append('classId', this.courseNumber);
              param.append('homeworkId', this.homeworkNumber);
              this.fileList.forEach(val => {
                param.append("multipartFile", val.raw);
              })
              api.addAnswerFile(param).then(res => {
                if (res.data.code === 20000) {
                  ElMessage.success("上传成功");
                } else {
                  ElMessage.error("上传失败");
                }
              })
            } else {
              ElMessage.error("上传失败");
            }
          })
        }
      } else {
        //没有附件
        if (this.contentEditor.getValue().length === 1 || this.contentEditor.getValue() === null || this.contentEditor.getValue() === '') {
          // 没有文字
          ElMessage.error('答案内容和附件必须上传其一');
          return false;
        } else {
          // 有文字
          this.answerData.homeworkId = this.homeworkNumber;
          this.answerData.content = this.contentEditor.getValue();
          api.addAnswer(this.answerData).then(res => {
            if (res.data.code === 20000) {
              ElMessage.success("上传成功")
            } else {
              ElMessage.error("上传失败");
            }
          })
        }
      }
    },
    // 处理文件改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  },
}
</script>

<style scoped>

</style>