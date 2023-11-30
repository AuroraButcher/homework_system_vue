<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--布置作业详情-->
    <el-divider content-position="left">作业内容</el-divider>
    <detail/>
    <!--答案-->
    <el-divider content-position="left">作业答案</el-divider>
    <answer/>
    <!--提交内容详情-->
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
          <el-button type="primary" style="margin-left: 3%" @click="checkGrade">确定</el-button>
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
    <!--评语-->
    <el-divider content-position="left">作业点评</el-divider>
    <el-input
        type="textarea"
        :rows="4"
        v-model="comment"
        placeholder="请输入评语"
        class="textarea"
        :disabled="this.index === 2"
    >
    </el-input>
    <el-button type="primary" style="margin-left: 10px" @click="checkComment" v-if="this.index!==2">确定</el-button>
  </el-card>
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
  name: "DetailSubmitHomework",
  components: {Answer, Detail, PageHeader},
  created() {
    api.getStuHomework(this.homeworkID).then(async res=>{
      if(res.data.code===20000){
        this.files=res.data.data.files;
        this.date=res.data.data.info.date;
        this.studentNumber=res.data.data.info.studentNumber;
        this.answer = await Vditor.md2html(res.data.data.info.answer);
        //TODO 老师获取自己评语
        if(this.role==='student'||this.index===2){
          api.stuGetCommentById(this.scoreId)
              .then(res => {
                if (res.data.code === 20000) {
                  this.comment = res.data.data.score.content
                  this.grade=res.data.data.score.score
                  if(this.grade===-1) {
                    this.grade = null
                  } else {
                    this.isGrade = true
                  }
                } else {
                  ElMessage.error("加载评语失败");
                }
              })
        }else if(this.role==='teacher'){
          api.teaGetGrade({homeworkId: this.homeworkID}).then(res=>{
            if(res.data.code===20000){
              this.grade=res.data.data.info.score
            }else if(res.data.code===20001){
              ElMessage.error(res.data.message);
            } else {
              ElMessage.error("加载评分失败");
            }
          })
        }
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
    checkGrade(){
      const grade = parseInt(this.grade);
      if (isNaN(grade)) {
        // 输入无效，进行相应的处理
        ElMessage.error("输入错误的分数");
      }else if(grade < 0 || grade > 100){
        ElMessage.error("分数在0-100之间");
      } else {
        // 输入有效，进行相应的处理
        // 学生互评分数
        if(this.role==='student'||this.index===2){
          api.stuEvaluateGrade({id:this.scoreId,grade:this.grade}).then(res=>{
            if(res.data.code===20000){
              this.isGrade=true
              ElMessage.success("提交成功");
            }else {
              ElMessage.error("提交失败");
            }
          })
        }else if(this.role==='teacher'){
          let data={grade:this.grade,homeworkId:this.homeworkID}
          api.teaEvaluateGrade({grade:this.grade,homeworkId:this.homeworkID}).then(res=>{
            if(res.data.code===20000){
              this.$store.commit('setScoreId',res.data.data.score.id)
              this.isGrade=true
              ElMessage.success("提交成功");
            }else {
              ElMessage.error("提交失败");
            }
          })
        }else {
          ElMessage.error("提交失败");
        }
      }
    },
    checkComment(){//提交评语
      if(this.comment===''||this.comment===null){
        ElMessage.error("评语不能为空");
      }else if(this.grade===''||this.grade===null||!this.isGrade){
        ElMessage.error("请先评分");
      }else {
        if (this.role === 'student') {
          api.stuComment({id: this.scoreId, comment: this.comment}).then(res => {
            if (res.data.code === 20000) {
              ElMessage.success("提交成功");
            } else {
              ElMessage.error("提交失败");
            }
          })
        } else if (this.role === 'teacher') {
          api.teaComment({id: this.scoreId, comment: this.comment})
            .then(res => {
              if (res.data.code === 20000) {
                ElMessage.success("提交成功");
              } else {
                ElMessage.error("提交失败");
              }
            })
         }
      }
    }
  },
  computed:{
    ...mapState(['homeworkNumber','homeworkID','studentNumber','role','index','courseNumber','scoreId'])
  }
}
</script>

<style scoped>
.textarea{
  width: 50%;
}
</style>