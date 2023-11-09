<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--布置详情-->
    <el-divider content-position="left">作业内容</el-divider>
    <detail/>
    <el-divider content-position="left">学生提交内容</el-divider>
    <el-descriptions :column="2" border style="margin-top: 10px">
      <el-descriptions-item label="学号:">{{studentNumber}}</el-descriptions-item>
      <el-descriptions-item label="得分:">
        <div style="display: flex;">
          <el-input placeholder="输入分数"
                    v-model="grade"
                    type="number"
                    min="0"
                    max="100"
                    oninput="if(value>100)value=100;if(value<0)value=0">
          </el-input>
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
        this.date=res.data.data.info.date;
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
      grade:null,
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

      const grade = parseInt(this.grade);
      if (isNaN(grade)) {
        // 输入无效，进行相应的处理
        ElMessage.error("输入错误的分数");
      }else if(grade < 0 || grade > 100){
        ElMessage.error("分数在0-100之间");
      } else {
        // 输入有效，进行相应的处理
        // 学生互评分数
        if(this.role==='student'){
          api.stuEvaluateGrade({id:this.index,grade:this.grade}).then(res=>{
            if(res.data.code===20000){
              ElMessage.success("提交成功");
            }else {
              ElMessage.error("提交失败");
            }
          })
        }

      }
    },
  },
  computed:{
    ...mapState(['homeworkID','studentNumber','role','index'])
  }
}
</script>

<style scoped>

</style>