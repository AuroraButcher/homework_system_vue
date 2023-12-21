<template>
  <add-excellent v-model="addExcellent" @addExcellent="exClose"></add-excellent>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--表格-->
    <el-table :data="tableData" border style="width:100%;" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <!--学生作业id-->
      <el-table-column label="ID" prop="id" width="80px" v-if="false"></el-table-column>
      <el-table-column label="学生学号" prop="studentNumber" width="120px"></el-table-column>
      <el-table-column label="提交时间" prop="date" width="200px"></el-table-column>
      <el-table-column label="老师评分" prop="teaScore" width="100px"></el-table-column>
      <el-table-column label="最后得分" prop="score" width="100px">
        <template #default="scope">
          {{scope.row.score===-1?'抄袭作业':scope.row.score}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="showDetailInfo(scope)">批改</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="setExHomework(scope)">
            {{ this.ex[scope.$index]===0?'设置优秀作业':'修改优秀作业状态' }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="showNotSubmit" style="margin-top: 20px">未交名单</el-button>
    <el-button type="primary" @click="remind" style="margin-top: 20px">一键催交</el-button>
    <el-button type="primary" @click="createGrade" style="margin-top: 20px">生成最终得分</el-button>
    <el-table :data="similarData" border style="width:100%; margin-top: 20px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="学号1" prop="id1" width="100px"></el-table-column>
      <el-table-column label="学号2" prop="id2" width="100px"></el-table-column>
      <el-table-column label="相似度" width="150px">
        <template #default="scope">
          <span v-if="scope.row.similar1>0.9||scope.row.similar2 > 0.9" style="color: red; font-weight: bold">相似度大于90%</span>
          <span v-else-if="scope.row.similar1>0.8||scope.row.similar2 > 0.8" style="color: rgb(255,115,0); font-weight: bold">相似度80%~90%</span>
          <span v-else-if="scope.row.similar1>0.7||scope.row.similar2 > 0.7" style="color: orange; font-weight: bold">相似度70%~80%</span>
          <span v-else style="color: rgba(255,196,0,0.85); font-weight: bold">有点相似</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="showDetail(scope)">查看内容</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog title="未交名单" width="40%" v-model="notSubmit">
    <el-table :data="notSubmitList" border style="width:100%;" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="学生学号" prop="studentId"></el-table-column>
      <el-table-column label="状态"><span style="color: red;font-weight: bold;">未交</span></el-table-column>
    </el-table>
    <hr style="margin-top: 10px">
    <el-pagination
        v-model:current-page="notSubmitPage.pageNo"
        v-model:page-size="notSubmitPage.pageSize"
        :total="notSubmitPage.total"
        @current-change="handlePageChangeNotSubmit"
        :hide-on-single-page="false"/>
  </el-dialog>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {mapState} from "vuex";
import {ElMessage} from "element-plus";
import AddExcellent from "./addExcellent.vue";

export default {
  inject:['reload'],  //注入依赖
  components: {AddExcellent, PageHeader},
  name: "homeworkCondition",
  data() {
    return {
      head: '作业提交情况',
      key: 1,
      ex:[],
      submitNumber:'',
      numberOfStudent:'',
      addExcellent:false,
      ExComment:'你好',
      tableData: [
        {
          id: '',
          studentNumber: '1',
          date: '',
          score: null,
        }
      ],
      similarData: [],
      params: {
        classID: null,
        homeworkID: null,
        pageNo: 1,
        pageSize: 10,
      },
      notSubmit: false,
      notSubmitList: [
        {
          id: null,
          classId: null,
          studentId: null,
        }
      ],
      notSubmitPage: {
        classID: null,
        homeworkID: null,
        pageNo: 1,
        pageSize: 5,
        total: null,
      }
    }
  },
  created() {
    // 获取提交作业列表
    if(this.homeworkNumber!==null&&this.courseNumber!==null){
      this.params.classID=this.courseNumber
      this.params.homeworkID=this.homeworkNumber
      api.homeworkCondition(this.params).then(res => {
        if (res.data.code === 20000) {
          this.tableData = res.data.data.homeworkInfo.records;
          this.ex=res.data.data.excellent
          for(let i=0;i<this.tableData.length;i++){
            api.teaGetGrade({homeworkId: this.tableData[i].id}).then(res1=>{
              if(res1.data.code===20000){
                this.tableData[i].teaScore=res1.data.data.info.score
              }else if(res1.data.code===20001){
                //ElMessage.error(res1.data.message);
              } else {
                ElMessage.error("加载评分失败");
              }
            })
          }
        }
      }).catch(res=>{
        ElMessage.error()
      });
      this.getSimilarData1();
    }
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber']),

  },
  methods: {
    // 提交作业详情
    showDetailInfo(scope) {
      this.$store.commit('setHomeworkID', scope.row.id);
      this.$store.commit('setStudentNumber', scope.row.studentNumber);
      this.$store.commit('setIndex',1)
      this.$router.push('/detailSubmitHomework');
    },
    // 处理页数改变
    handlePageChange() {
      api.showCourse(this.page).then(res => {
        if (res.data.code === 20000) {
          this.page.total = res.data.data.classInfo.total;
          this.tableData = res.data.data.classInfo.records;
        } else {
          ElMessage.error(res.data.message);
        }
      })
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //设置优秀作业
    setExHomework(scope){
      this.$store.commit('setHomeworkID',scope.row.id)
      this.addExcellent=true
    },
    exClose(){
      this.addExcellent=false
      this.reload()
    },
    remind(){
      api.teaRemind(this.homeworkNumber).then(res=>{
        if(res.data.code===20000){
          ElMessage.success('提醒成功')
        }else {
          ElMessage.error('出现错误')
        }
      })
    },
    //SABTXT
    createGrade(){
      api.sabtxtScore(this.homeworkNumber).then(res=>{
        if(res.data.code===20000){
          if(res.data.data.error){
            ElMessage.error(res.data.data.error)
          }else {
            ElMessage.success('分数生成成功')
          }
        }else {
          ElMessage.error('分数生成失败')
        }
      })
    },
    //获取相似度信息，words
    getSimilarData1(){
      api.similarWords({homeworkNumber:this.homeworkNumber,courseNumber:this.courseNumber}).then(res=>{
        if(res.data.code===20000){
          let data=res.data.data
          let keyData=Object.keys(data)
          for(let i=0;i<keyData.length;i++){
            const keys = Object.keys(data[i])
            this.similarData[i]={
              id1:keys[0],
              id2:keys[1],
              similar1:data[i][keys[0]].toFixed(6),
              similar2:0,
            }
          }
          this.getSimilarData2()
        }else {
          ElMessage.error(res.data.message)
        }
      })
    },
    getSimilarData2(){
      api.similarJieba({homeworkNumber:this.homeworkNumber,courseNumber:this.courseNumber}).then(res=>{
        if(res.data.code===20000){
          let data=res.data.data
          let keyData=Object.keys(data)
          for(let i=0;i<keyData.length;i++){
            const keys = Object.keys(data[i])
            this.similarData[i].similar2=data[i][keys[0]].toFixed(6)
          }
        }else {
          ElMessage.error(res.data.message)
        }
      })
    },
    //查看相似信息
    showDetail(scope){
      let homeworkId1,homeworkId2;
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].studentNumber===scope.row.id1){
          homeworkId1 = this.tableData[i].id
        }
        if (this.tableData[i].studentNumber === scope.row.id2) {
          homeworkId2 = this.tableData[i].id
        }
      }
      let index = [scope.row.id1, scope.row.id2, homeworkId1, homeworkId2];
      this.$store.commit('setIndex', index)
      this.$router.push('/similarCheck')
    },
    // 查看未提交作业名单
    showNotSubmit() {
      this.notSubmit = true;
      this.notSubmitPage.classID = this.courseNumber;
      this.notSubmitPage.homeworkID = this.homeworkNumber;
      api.getNotSubmitList(this.notSubmitPage).then(res => {
        if (res.data.code === 20000) {
          this.notSubmitList = res.data.data.notSubmittedInfo.records;
          this.notSubmitPage.total = res.data.data.notSubmittedInfo.total;
        }
      })
    },
    handlePageChangeNotSubmit() {
      api.getNotSubmitList(this.notSubmitPage).then(res => {
        if (res.data.code === 20000) {
          this.notSubmitList = res.data.data.notSubmittedInfo.records;
          this.notSubmitPage.total = res.data.data.notSubmittedInfo.total;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>