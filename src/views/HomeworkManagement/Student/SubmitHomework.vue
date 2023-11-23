<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--查看布置的作业内容-->
    <Detail></Detail>
    <!--编辑器-->
    <div class="editor" id="vditor"></div>
    <!--附件-->
    <div>
      <el-divider content-position="left">作业附件</el-divider>
          <ul v-for="(item,index) in files" :key="index">
            <li>
              <el-button type="success" link>
                <a @click="download(item)">{{ item }}</a>
              </el-button>
              <el-button type="danger" link>
                <a @click="deleteFile(item, homeworkStudentId)">删除</a>
              <!-- <i class="el-icon-close"></i> -->
              </el-button>
            </li>
          </ul>
    </div>
    <!--提交按钮-->
    <div>
      <el-divider content-position="left">提交附件</el-divider>
      <el-upload action="/homework/addFile" :auto-upload="false" :file-list="fileList" :on-change="handleChange">
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div>
            文件小于5Mb
          </div>
        </template>
      </el-upload>
    </div>
    <el-divider content-position="left">提交附件</el-divider>
    <el-button type="primary" @click="submitHomework">提交作业</el-button>
  </el-card>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessage} from "element-plus";
import Cookie from "js-cookie";
import {mapState} from "vuex";
import Detail from "../Shared/Detail.vue";

export default {
  computed: {
    ...mapState(['courseNumber','homeworkNumber','homeworkID','index'])
  },
  components: {Detail, PageHeader},
  data() {
    return {
      head: "提交作业",
      contentEditor: {},
      // 文件列表
      fileList: [],
      files : [],
      homeworkStudentId: null,
      homeworkData: {
        homeworkId: null,
        classId: null,
        time: null,
        content: null,
        studentNumber: null,
      },
      downloadData: {
          id: null,
          classID: null,
          downloadFileName: null,
          studentNumber:null,
      },
      deleteData: {
        id: null,
        classID: null,
        deleteFileName: null,
        studentNumber:null,
        homeworkID:null,
      }
    }
  },
  created() {
    // 重新提交会调用，将上传的内容内置进去
    if (this.homeworkID !== null) {
      api.getStuHomework(this.homeworkID).then(res => {
        if (res.data.code === 20000) {
          this.files = res.data.data.files;
          this.homeworkData.content = res.data.data.info.answer
          this.contentEditor.setValue(res.data.data.info.answer)
          this.homeworkStudentId = res.data.data.info.id
          console.log(this.homeworkStudentId)
        } else {
          ElMessage.success("上传失败");
        }
      })
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
    // 提交作业
    // TODO：如果内容其一不为空，可以提交 @wx:什么意思，内容其一是什么东西
    submitHomework() {
      if (this.contentEditor.getValue().length === 1 || this.contentEditor.getValue() == null || this.contentEditor.getValue() === '') {
        alert('内容不可为空');
        return false;
      } else {
        this.homeworkData.classId = this.$store.state.courseNumber;
        this.homeworkData.homeworkId = this.$store.state.homeworkNumber;
        this.homeworkData.studentNumber = Cookie.get('number');
        this.homeworkData.content = this.contentEditor.getValue();
        api.submitHomework(this.homeworkData).then(res => {
          if(res.data.code === 20000) {
            // TODO: 使用上交的res里面的id代替sb里面找的id
            api.stuViewHomework({classID:this.homeworkData.classId,studentID:this.homeworkData.studentNumber}).then(res=>{
              if (res.data.code === 20000&&res.data.data.isSubmitted[this.index]!==0) {
                this.homeworkNo=res.data.data.isSubmitted[this.index]
                if(this.fileList.length>0){
                  const param = new FormData();
                  param.append("homeworkID", this.homeworkNumber);
                  param.append("classID", this.courseNumber);
                  param.append("studentID", Cookie.get('number'));
                  param.append("id", this.homeworkNo);
                  this.fileList.forEach(val => {
                    param.append("multipartFile", val.raw);
                  })
                  api.stuHomeworkFile(param).then(res => {
                    if (res.data.code === 20000) {
                      ElMessage.success("上传成功");
                      //this.$router.push('/stuViewHomework');
                    } else {
                      ElMessage.error("上传失败");
                    }
                  })
                }else {
                  ElMessage.success("上传成功");
                }
              }else {
                ElMessage.error("上传失败");
              }
            });
          } else {
            ElMessage.error("上传失败");
          }
        });
      }
    },
    // 处理文件改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    download(item) {
        this.downloadData.id = this.$store.state.homeworkNumber;
        this.downloadData.classID = this.$store.state.courseNumber;
        this.downloadData.downloadFileName = item;
        this.downloadData.studentNumber = Cookie.get('number');
        api.downloadStudentFiles(this.downloadData).then(res => {
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
    deleteFile(item, homeworkStudentId) {
      this.deleteData.id = homeworkStudentId;
      this.deleteData.homeworkID = this.$store.state.homeworkNumber;
      this.deleteData.classID = this.$store.state.courseNumber;
      this.deleteData.deleteFileName = item;
      this.deleteData.studentNumber = Cookie.get('number');
      api.deleteStudentFiles(this.deleteData).then(res => {
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
.editor {
  margin-top: 10px;
}
</style>