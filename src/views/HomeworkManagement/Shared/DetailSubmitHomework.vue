<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--布置详情-->
    <detail/>
    <el-descriptions :column="2" border title="提交内容" style="margin-top: 10px">
      <el-descriptions-item label="学号:">{{studentNumber}}</el-descriptions-item>
      <el-descriptions-item label="得分:">
        <div style="display: flex;">
          <el-input placeholder="输入分数"></el-input>
          <el-button type="primary" style="margin-left: 3%" @click="checkGrade">确定</el-button>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="提交时间:">{{date}}</el-descriptions-item>
      <el-descriptions-item label="超时时间:">{{ time }}</el-descriptions-item>
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
import Detail from "./Detail.vue";
import {mapState} from "vuex";
import api from "../../../api";
import {ElMessage} from "element-plus";
import Vditor from "vditor";

export default {
  name: "DetailSubmitHomework",
  components: {Detail, PageHeader},
  created() {
    api.getStuHomework(this.homeworkID).then(async res=>{
      if(res.data.code===20000){
        this.files=res.data.data.files;
        this.date=res.data.data.info.date
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
      grade:Number,
      fileName: null,
      files: [],
    }
  },
  methods: {
    download(item) {
      //TODO 下载学生的附件
      /*this.downloadData.id = this.homeworkNumber;
      this.downloadData.classID = this.courseNumber;
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
          console.log(item)
          ElMessage.success("下载成功");
        } else {
          ElMessage.error("下载失败");
        }
      })*/
    },
    checkGrade(){
      // TODO 提交老师批改的分数
    },
  },
  computed:{
    ...mapState(['homeworkID','studentNumber'])
  }
}
</script>

<style scoped>

</style>