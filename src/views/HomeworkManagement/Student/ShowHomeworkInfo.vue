<template>
    <el-card>
      <template #header>
        <page-header :component="head"/>
      </template>
      <!-- <detail/> -->
      <!--提交内容详情-->
      <el-divider content-position="left">作业内容</el-divider>
      <el-descriptions :column="2" border style="margin-top: 10px">
        <el-descriptions-item label="学号:">{{studentNumber}}</el-descriptions-item>
        <el-descriptions-item label="提交时间:">{{date}}</el-descriptions-item>
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
    </el-card>
  </template>
  
  <script>
  import PageHeader from "../../Base/PageHeader.vue";
  import Detail from "../Shared/Detail.vue";
  import {mapState} from "vuex";
  import api from "../../../api";
  import {ElMessage} from "element-plus";
  import Vditor from "vditor";
  import Cookie from "js-cookie";
  
  export default {
    name: "DetailSubmitHomework",
    components: {Detail, PageHeader},
    created() {
      api.getStuHomework(this.homeworkID).then(async res=>{
        if(res.data.code===20000){
          this.files=res.data.data.files;
          this.date=res.data.data.info.date;
          this.homeworkId=res.data.data.info.homeworkId;
          this.studentNumber=res.data.data.info.studentNumber;
          this.answer = await Vditor.md2html(res.data.data.info.answer);
        }else {
          ElMessage.error("加载失败");
        }
      })
    },
    data() {
      return {
        head: '作业提交详情',
        answer: null,
        classId: null,
        submit: null,
        time:null,
        date: null,
        studentNumber:null,
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
    methods: {
      download(item) {
        this.downloadData.id = this.homeworkId;
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
    computed:{
      ...mapState(['homeworkNumber','homeworkID','studentNumber','role','index','courseNumber'])
    }
  }
  </script>
  
  <style scoped>
  .textarea{
    width: 50%;
  }
  </style>