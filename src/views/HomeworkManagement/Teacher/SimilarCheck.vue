<template>
  <el-divider>作业1</el-divider>
  <student-homework :studentNumber=studentNumber1 :homework-id="homeworkId1"/>
  <el-button type="primary" @click="check(studentNumber1)" style="margin-top: 20px;margin-left: 6%">判定为抄袭</el-button>
  <el-divider>作业2</el-divider>
  <student-homework :studentNumber=studentNumber2 :homework-id="homeworkId2"/>
  <el-button type="primary" @click="check(studentNumber2)" style="margin-top: 20px;margin-left: 6%">判定为抄袭</el-button>
</template>

<script>
import StudentHomework from "../Shared/StudentHomework.vue";
import {mapState} from "vuex";
import {ElMessage} from "element-plus";
import api from "../../../api";
export default {
  name: "SimilarCheck",
  components: {StudentHomework},
  data(){
    return{
      studentNumber1:null,
      studentNumber2:null,
      homeworkId1:null,
      homeworkId2:null,
    }
  },
  created() {
    this.studentNumber1=this.index[0];
    this.studentNumber2=this.index[1];
    this.homeworkId1=this.index[2];
    this.homeworkId2=this.index[3];
  },
  computed:{
    ...mapState(['homeworkNumber','role','index','courseNumber','scoreId']),
  },
  methods:{
    check(number){
      api.similarSet({studentNumber:number,homeworkNumber:this.homeworkNumber,courseNumber:this.courseNumber}).then(res=>{
        if(res.data.code===20000){
          ElMessage.success('判定成功')
        }else {
          ElMessage.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>