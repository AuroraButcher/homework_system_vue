<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--设置标题、开始时间和截止时间、是否允许多次提交-->
    <div>
      <el-descriptions :column="3" title="作业设置">
        <el-descriptions-item label="标题：">
          <el-input style="width: 200px" v-model="homeworkData.title"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="起始与截止时间：">
          <el-date-picker
              v-model="homeworkData.time"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="截止时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD hh:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
              style="margin-left: 10px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="允许多次提交：">
          <el-switch
              v-model="resubmit"
              style="margin-left: 15px"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
          />
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!--编辑器-->
    <span style="font-weight: bold">作业内容</span>
    <div class="editor" id="vditor"></div>
    <!--附件-->
    <!--提交按钮-->
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
    <el-button type="primary" style="width: 150px;margin-top: 10px" @click="assignHomework">发布作业</el-button>
  </el-card>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import PageHeader from "../../Base/PageHeader.vue";
import {Apple, Check, Close} from "@element-plus/icons-vue";
import api from "../../../api";
import {ElMessage} from "element-plus";
import SetEvaluation from "./SetEvaluation.vue";

export default {
  computed: {
    Close() {
      return Close;
    },
    Check() {
      return Check;
    },
  },
  components: {SetEvaluation, Apple, PageHeader},
  data() {
    return {
      head: "添加作业",
      contentEditor: {},
      // 文件列表
      fileList: [],
      homeworkNumber:null,
      resubmit: false,
      homeworkData: {
        title: null,
        classId: null,
        time: null,
        content: null,
        multiple: null,
      },
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
  methods: {
    assignHomework() {
      if (this.contentEditor.getValue().length === 1 || this.contentEditor.getValue() == null || this.contentEditor.getValue() === '') {
        alert('话题内容不可为空');
        return false;
      } else {
        this.homeworkData.classId = this.$store.state.courseNumber;
        this.homeworkData.content = this.contentEditor.getValue();
        this.homeworkData.multiple=(this.resubmit === true)?1:0;
        api.addHomework(this.homeworkData).then(response => {
          if (response.data.code === 20000) {
            if(this.fileList.length>0){
              this.homeworkNumber=response.data.data.homework.id
              const param = new FormData();
              param.append('id',this.homeworkNumber)
              param.append('classID',this.homeworkData.classId)
              this.fileList.forEach(val => {
                param.append("multipartFile", val.raw);
              })
              api.addHomeworkFile(param).then(res=>{
                if (res.data.code === 20000) {
                  ElMessage.success("上传成功");
                  //this.$router.push('/stuViewHomework');
                } else {
                  ElMessage.error("上传失败");
                }
              })
            }else {
              ElMessage.success("添加成功");
            }
          } else {
            ElMessage.success("添加失败");
          }
        });
      }
    },
    // 处理文件改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
  }
}
</script>

<style scoped>
.editor {
  margin-top: 10px;
}
</style>