<template>
  <el-divider content-position="left">学生提交内容</el-divider>
  <el-descriptions :column="2" border style="margin-top: 10px">
    <el-descriptions-item label="学号:">{{this.role==='teacher'? studentNumber:'*****' }}</el-descriptions-item>
    <el-descriptions-item label="得分:">
      <div style="display: flex;">
        <el-input placeholder="输入分数"
                  v-model="grade"
                  type="number"
                  min="0"
                  max="100"
                  oninput="if(value>100)value=100;if(value<0)value=0">
        </el-input>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="提交时间:">{{date}}</el-descriptions-item>
    <el-descriptions-item label="超时时间:">{{time}}</el-descriptions-item>
    <el-descriptions-item label="提交内容:" span="2">
      <div v-html="answer"></div>
    </el-descriptions-item>
    <el-descriptions-item label="作业附件:" span="2">
      <ul v-for="(item,index) in files" :key="index">
        <li>
          <el-button type="success" link>
            <a @click="download(item)">{{ item }}</a>
          </el-button>
        </li>
      </ul>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Detail from "./Detail.vue";
import {mapState} from "vuex";
import api from "../../../api";
import {ElMessage} from "element-plus";
import Vditor from "vditor";
import Cookie from "js-cookie";
import Answer from "./Answer.vue";
export default {
  name: "StudentHomework",
  components: {Answer, Detail, PageHeader},
  data() {
    return {
      answer: null,
      classId: null,
      submit: null,
      time:null,
      date: null,
      grade:null,
      fileName: null,
      files: [],
      comment:null,
      isGrade:false,
      downloadData: {
        id: null,
        classID: null,
        downloadFileName: null,
        studentNumber:null,
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    download(item) {
      this.downloadData.id = this.homeworkNumber;
      this.downloadData.classID = this.courseNumber;
      this.downloadData.downloadFileName = item;
      this.downloadData.studentNumber = this.studentNumber;
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
    getData(){
      api.getStuHomework(this.homeworkId).then(async res=>{
        if(res.data.code===20000){
          this.files=res.data.data.files;
          this.date=res.data.data.info.date;
          this.studentNumber=res.data.data.info.studentNumber;
          this.answer = await Vditor.md2html(res.data.data.info.answer);
        }else {
          ElMessage.error("加载失败");
        }
      })
    },
  },
  computed:{
    ...mapState(['homeworkNumber','role','index','courseNumber','scoreId'])
  },
  props: {
    'studentNumber':null,
    'homeworkId':null,
  }
}
</script>

<style scoped>

</style>