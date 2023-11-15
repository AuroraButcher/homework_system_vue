<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--提交内容详情-->
    <el-divider content-position="left">优秀作业内容</el-divider>
    <el-descriptions :column="2" border style="margin-top: 10px">
      <el-descriptions-item label="学号:">{{studentNumber}}</el-descriptions-item>
      <el-descriptions-item label="得分:">{{grade}}</el-descriptions-item>
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
      <el-descriptions-item label="老师评语">{{comment}}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessage, ElMessageBox} from "element-plus";
import {mapState} from "vuex";
import Cookie from "js-cookie";
import AddExcellent from "../Teacher/addExcellent.vue";
import Vditor from "vditor";

export default {
  name: "Excellent",
  components: {PageHeader},
  data(){
    return{
      head:'优秀作业详情',
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
      studentNumber:null,
      downloadData: {
        id: null,
        classID: null,
        downloadFileName: null,
        studentNumber:null,
      }
    }
  },
  computed:{
    ...mapState(['homeworkID'])
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
  },
  created() {
    api.getOneExcellent(this.homeworkID).then(async res=>{
      if(res.data.code===20000){
        this.comment=res.data.data.excellentInfo.content;
        this.grade=res.data.data.homeworkInfo.info.score;
        this.files=res.data.data.homeworkInfo.files;
        this.date=res.data.data.homeworkInfo.info.date;
        this.studentNumber=res.data.data.homeworkInfo.info.studentNumber;
        this.answer = await Vditor.md2html(res.data.data.homeworkInfo.info.answer);
      }else {
        ElMessage.error("加载失败");
      }
    })
  }
}
</script>

<style scoped>

</style>