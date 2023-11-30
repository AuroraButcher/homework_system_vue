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
      <el-table-column label="最后得分" prop="score" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="showDetailInfo(scope)">批改</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="setExHomework(scope)">
            {{ this.ex[scope.$index]===0?'设置优秀作业':'修改优秀作业状态' }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="remind" style="margin-top: 10px">一键催交</el-button>
    <el-button type="primary" @click="createGrade" style="margin-top: 10px">生成最终得分</el-button>
  </el-card>
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
          score:null,
        }
      ],
      params: {
        classID: null,
        homeworkID: null,
        pageNo: 1,
        pageSize: 10,
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
                ElMessage.error(res1.data.message);
              } else {
                ElMessage.error("加载评分失败");
              }
            })
          }
        }
      }).catch(res=>{
        ElMessage.error()
      })
    }
  },
  computed: {
    ...mapState(['homeworkNumber', 'courseNumber'])
  },
  methods: {
    // 提交作业详情
    showDetailInfo(scope) {
      this.$store.commit('setHomeworkID', scope.row.id);
      this.$store.commit('setStudentNumber', scope.row.studentNumber);
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
    }
  }
}
</script>

<style scoped>

</style>