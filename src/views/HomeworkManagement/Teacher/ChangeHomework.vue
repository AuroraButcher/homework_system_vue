<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--设置标题、开始时间和截止时间、是否允许多次提交-->
    <div class="selectHeader">
      <span style="font-weight: bold">标题：</span>
      <el-input style="width: 200px" v-model="homeworkData.title"></el-input>
      <span style="font-weight: bold;margin-left: 20px">起始与截止时间：</span>
      <el-date-picker
          v-model="homeworkData.time"
          type="datetimerange"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DDThh:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
          style="margin-left: 10px"
      />
      <span style="font-weight: bold;margin-left: 20px">允许多次提交：</span>
      <el-switch
          v-model="resubmit"
          style="margin-left: 15px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
      />
      <el-button type="primary" style="width: 150px;margin-left: 20px" @click="ChangeHomework">确认修改</el-button>
    </div>
    <!--编辑器-->
    <div class="editor" id="vditor"></div>
    <div>
      <el-divider content-position="left">作业附件</el-divider>
          <ul v-for="(item,index) in files" :key="index">
            <li>
              <el-button type="success" link>
                <a @click="download(item)">{{ item }}</a>
              </el-button>
              <el-button type="danger" link>
                <a @click="deleteFile(item)">删除</a>
              <!-- <i class="el-icon-close"></i> -->
              </el-button>
            </li>
          </ul>
    </div>
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
  </el-card>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import PageHeader from "../../Base/PageHeader.vue";
import {Apple, Check, Close} from "@element-plus/icons-vue";
import api from "../../../api";
import {ElMessage} from "element-plus";
import {mapState} from "vuex";

export default {
  computed: {
    Close() {
      return Close;
    },
    Check() {
      return Check;
    },
    ...mapState(['homeworkNumber'])
  },
  created() {
    if (this.homeworkNumber !== null) {
      this.homeworkData.id=this.homeworkNumber;
      api.getHomeworkInfo(this.homeworkNumber).then(async res => {
        if (res.data.code === 20000) {
          this.files = res.data.data.files
          this.homeworkData.title = res.data.data.info.name;
          this.resubmit=(res.data.data.info.resubmit === 1);
          this.homeworkData.multiple = (res.data.data.info.resubmit === 1) ;
          this.homeworkData.time=[res.data.data.info.start,res.data.data.info.end];
          this.contentEditor.setValue(res.data.data.info.content);
        }
      })
    }
  },
  components: {Apple, PageHeader},
  data() {
    return {
      head: "修改作业",
      contentEditor: {},
      time: '',
      resubmit:false,
      fileList:[],
      files: [],
      downloadData: {
        id: null,
        classID: null,
        downloadFileName: null,
        score:null,
      },
      homeworkData: {
        id:Number,
        title: null,
        classId: null,
        time: [],
        content: null,
        multiple: null,
      },
      deleteData: {
        classID: null,
        deleteFileName: null,
        id:null,
      }
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
        "upload",//上传文件
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
    ChangeHomework() {
      if (this.contentEditor.getValue().length === 1 || this.contentEditor.getValue() == null || this.contentEditor.getValue() === '') {
        alert('话题内容不可为空');
        return false;
      } else {
        this.homeworkData.classId = this.$store.state.courseNumber;
        this.homeworkData.content = this.contentEditor.getValue();
        this.homeworkData.multiple=this.homeworkData.multiple?1:0;
        api.changeHomework(this.homeworkData).then(response => {
          if (response.data.code === 20000) {
            ElMessage.success("修改成功");
          } else {
            ElMessage.error("修改失败");
          }
        });
      }
    },
    download(item) {
        this.downloadData.id = this.$store.state.homeworkNumber;
        this.downloadData.classID = this.$store.state.courseNumber;
        this.downloadData.downloadFileName = item;
        api.downloadFiles(this.downloadData).then(res => {
          if (res.data.code === 20000) {
            const url = res.data.data.url;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', item);
            document.body.appendChild(link);
            link.click();
            link.remove();
            ElMessage.success("下载成功");
          } else {
            ElMessage.error("下载失败");
          }
        })
      },
      deleteFile(item) {
      this.deleteData.id = this.$store.state.homeworkNumber;
      this.deleteData.classID = this.$store.state.courseNumber;
      this.deleteData.deleteFileName = item;
      api.deleteFiles(this.deleteData).then(res => {
        if (res.data.code === 20000) {
          const url = res.data.data.url;
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('delete', item);
          document.body.appendChild(link);
          link.click();
          link.remove();
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      })
    },
  }
}
</script>

<style scoped>
.selectHeader {
  display: flex;
  align-items: center;
}

.editor {
  margin-top: 10px;
}
</style>