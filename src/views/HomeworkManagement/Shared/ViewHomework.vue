<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-button type="primary" style="margin-left: 10px" @click="addHomework()" v-if="role==='teacher'">添加作业</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="showCodeHomework(scope)" v-show="role==='teacher'">添加代码作业</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="编号" prop="id" width="50px" v-if="false"></el-table-column>
      <el-table-column label="作业名称" prop="name" width="150px">
        <template #default="scope">
          <el-link link v-if="scope.row.type === 0" @click="showDetailInfo(scope)">{{ scope.row.name }}</el-link>
          <el-link link v-else @click="showCodeInfo(scope)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" prop="end" width="170px"></el-table-column>
      <el-table-column label="类型" prop="type" width="60px" v-if="true">
        <template #default="scope">
          <el-link type="primary" v-if="scope.row.type===0">文本</el-link>
          <el-link type="danger" v-else>代码</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <el-table-column label="作业" width="100px" v-if="role==='teacher'">
          <template #default="scope">
            <el-link type="primary" link @click="changeHomework(scope)">修改</el-link>
            <el-link type="danger" link style="margin-left: 10px" @click="deleteHomework(scope)">删除</el-link>
          </template>
        </el-table-column>
        <el-table-column label="提交" width="100px">
          <template #default="scope">
            <el-link type="primary" link @click="viewSubmitHomework(scope)" v-if="role==='teacher'&&compareStart(scope.row.index)">提交情况</el-link>
            <el-link type="primary" link disabled v-if="role==='teacher'&&!compareStart(scope.row.index)">尚未开始</el-link>
            <div v-show="role==='student'">
              <!--没交作业、没有截止-->
              <el-link type="primary" link @click="submitHomework(scope)" v-if="submit[scope.row.index]===0 && timeValid[scope.row.index]===0 && scope.row.type === 0">提交作业</el-link>
              <el-link type="primary" link @click="submitCode(scope)" v-else-if="submit[scope.row.index]===0 && timeValid[scope.row.index]===0 && scope.row.type !== 0">提交代码</el-link>
              <!--没交作业、已经截止-->
              <el-link type="info" link disabled v-else-if="submit[scope.row.index]===0 && timeValid[scope.row.index]===-1">作业已截止</el-link>
              <!--交了作业、已经截止-->
              <el-link type="warning" link @click="getStudentHWinfo(scope)" v-else-if="submit[scope.row.index]!==0 && timeValid[scope.row.index]===-1 && scope.row.type === 0">查看作业</el-link>
              <el-link type="warning" link @click="submitCode(scope)" v-else-if="submit[scope.row.index]!==0 && timeValid[scope.row.index]===-1 && scope.row.type !== 0">查看代码</el-link>
              <!--交了作业、没有截止-->
              <el-link type="success" link @click="resubmitHomework(scope)" v-else-if="submit[scope.row.index]!==0 && timeValid[scope.row.index]===0 && scope.row.type === 0">重新提交</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="互评" width="200px">
          <template #default="scope">
            <el-link type="primary" link @click="setEvaluation(scope)" v-if="role==='teacher' && compareEnd(scope.row.index) && scope.row.type === 0">互评设置</el-link>
            <el-link type="danger" style="margin-left: 10px" link @click="malicious(scope)" v-if="role==='teacher' && compareEnd(scope.row.index)&& scope.row.type === 0">恶意评分检测</el-link>
            <el-link type="info" link disabled v-if="role==='teacher' && !compareEnd(scope.row.index)&& scope.row.type === 0">互评设置</el-link>
            <!--开始互评并且是学生-->
            <el-link type="primary" link @click="evaluateHomework(scope)" v-if="review[scope.row.index]===1 && role==='student'&& scope.row.type === 0">互评作业</el-link>
            <!--互评尚未开始-->
            <el-link type="info" link disabled v-if="review[scope.row.index]===0 && role==='student'&& scope.row.type === 0">尚未开始</el-link>
            <!--互评已经结束-->
            <el-link type="danger" link disabled v-if="review[scope.row.index]===-1 && role==='student'&& scope.row.type === 0">已结束</el-link>
          </template>
        </el-table-column>
        <el-table-column label="答案" width="100px">
          <template #default="scope">
            <el-link type="primary" link @click="submitAnswer(scope)" v-if="scope.row.answer===0 && role==='teacher'&& scope.row.type === 0">上传答案</el-link>
            <el-link type="success" link @click="viewAnswer(scope)" v-if="scope.row.answer===1 && role==='teacher'&& scope.row.type === 0">查看答案</el-link>
            <el-link type="info" link disabled v-if="scope.row.answer===0 && role==='student'&& scope.row.type === 0">未上传</el-link>
            <el-link type="success" link @click="viewAnswer(scope)" v-if="scope.row.answer===1 && role==='student'&& scope.row.type === 0">查看答案</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分数统计" width="100px">
          <template #default="scope">
            <el-link type="info" link disabled v-if="review[scope.row.index]>=0 && role==='student'&& scope.row.type === 0">尚未统计</el-link>
            <el-link type="primary" link @click="showData(scope)" v-if="review[scope.row.index]===-1 && role==='student'&& scope.row.type === 0">分数分布</el-link>
            <el-link type="primary" link @click="showData(scope)" v-if="role ==='teacher'&& scope.row.type === 0">分数分布</el-link>
          </template>
        </el-table-column>
        <el-table-column label="优秀作业" width="120px">
          <template #default="scope">
            <el-link type="info" link disabled v-if="review[scope.row.index]>=0 && role==='student'&& scope.row.type === 0">查看优秀作业</el-link>
            <el-link type="primary" link @click="showExcellent(scope)" v-if="review[scope.row.index]===-1 && role==='student'&& scope.row.type === 0">查看优秀作业</el-link>
            <el-link type="primary" link @click="showExcellent(scope)" v-if="role==='teacher'&& scope.row.type === 0">查看优秀作业</el-link>
          </template>
        </el-table-column>
        <el-table-column label="讨论区">
          <template #default="scope">
            <el-link type="success" v-if="scope.row.discussion === 1" link @click="goDiscussion(scope)">进入讨论区</el-link>
            <el-link disabled type="info" v-if="scope.row.discussion === 0 && role === 'student'" link @click="goDiscussion(scope)">教师未开启</el-link>
            <el-link type="primary" v-if="scope.row.discussion === 0 && role === 'teacher'" link @click="openDiscussion(scope)">开设讨论区</el-link>
            <el-link type="danger" v-if="scope.row.discussion === 1 && role === 'teacher'" style="margin-left: 10px" link @click="closeDiscussion(scope)">关闭讨论区</el-link>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-model:current-page="page.pageNo"
        v-model:page-size="page.pageSize"
        :total="total"
        @current-change="handlePageChange"
        :hide-on-single-page="false"/>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessage, ElMessageBox} from "element-plus";
import {mapState} from "vuex";
import Cookie from "js-cookie";
import AddExcellent from "../Teacher/addExcellent.vue";

export default {
  components: {AddExcellent, PageHeader},
  data() {
    return {
      head: "作业列表",
      homeworkName: '',
      key: 1,
      tableData: [
        {
          id: null,
          classId: null,
          start: null,
          end: null,
          content: null,
          resubmit: null,
          fileName: null,
          name: null,
          score: null,
          discussion: null,
          answer: null,
        }
      ],
      page: {
        classID: '',
        pageNo: 1,
        pageSize: 10,
        studentID: Cookie.get('number'),
      },
      total: null,
      submit: [],
      timeValid: [],
      review: [],
    }
  },
  // 展示作业
  created() {
    this.getData()
  },
  methods: {
    getData(){
      this.page.classID=this.courseNumber;
      if(this.role==='teacher') {
        api.getHomeworkList(this.page).then(res => {
          if (res.data.code === 20000) {
            this.total = res.data.data.homeworkInfo.total;
            this.tableData = res.data.data.homeworkInfo.records;
          } else {
            console.log("查看作业列表失败");
          }
        })
      }else {
        api.stuViewHomework(this.page).then(res=>{
          if (res.data.code === 20000) {
            //设置表数据
            this.tableData = res.data.data.homeworkInfo.records;
            this.submit = res.data.data.isSubmitted;
            this.timeValid = res.data.data.timeValid;
            this.review = res.data.data.review;
            this.total = res.data.data.homeworkInfo.total;
          } else {
            ElMessage.error(res.data.message);
          }
        })
      }
    },
    // 添加作业
    addHomework(){
      this.$router.push('/teaAssignHomework');
    },
    //搜索作业
    search(name) {
      //TODO：作业列表搜索作业
    },
    //修改作业
    changeHomework(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push('/teaChangeHomework');
    },
    //展示详细信息
    showDetailInfo(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push('/detailedHomework');
    },
    //删除作业
    deleteHomework(scope) {
      ElMessageBox.confirm(
          '你确定你要删除吗?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        api.deleteHomework(scope.row.id).then(res => {
          if (res.data.code === 20000) {
            ElMessageBox.alert("删除成功", '消息', {
              confirmButtonText: 'OK',
              callback: action => {
                if (action === 'confirm') {
                  this.getData()
                  this.search()
                }
              }
            })
          } else {
            ElMessageBox.alert("删除失败", '消息', {
              confirmButtonText: 'OK',
            })
          }
        })
      }).catch(() => {
      })
    },
    // 查看提交情况
    viewSubmitHomework(scope) {
      if(scope.row.type===0){
        this.$store.commit('setHomeworkNumber', scope.row.id);
        this.$router.push('/homeworkCondition');
      }else {
        this.$store.commit('setCodeId',scope.row.type)
        this.$router.push('/codeSimilar');
      }
    },
    // 提交作业
    submitHomework(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      // 第一次提交作业，数据库无位置，置null
      this.$store.commit('setHomeworkID',null);
      this.$store.commit('setIndex', scope.row.index);
      this.$router.push('/submitHomework');
    },
    //重新提交作业
    resubmitHomework(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$store.commit('setHomeworkID', this.submit[scope.row.index]);
      this.$store.commit('setIndex', scope.row.index);
      this.$router.push('/submitHomework');
    },
    //查看学生作业
    getStudentHWinfo(scope){
      this.$store.commit("setHomeworkID", this.submit[scope.row.index]);
      this.$router.push("/homeworkInfo");
    },
    //互评作业
    evaluateHomework(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push('/evaluateHomework');
    },
    // 处理页数改变
    handlePageChange() {
      this.getData()
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //展示详细信息
    showCodeHomework(scope) {
      this.$store.commit('setCourseNumber', this.courseNumber);
      this.$router.push('/codeList');
    },
    // 分数分布
    showData(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/distribution");
    },
    //查看优秀作业
    showExcellent(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/viewExcellent");
    },
    // 互评设置
    setEvaluation(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/setDistribution");
    },
    // 进入讨论区
    goDiscussion(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/discussion");
    },
    // 开设讨论区
    openDiscussion(scope) {
      api.createDiscussion(scope.row.id).then(res => {
        if (res.data.code === 20000) {
          ElMessage.success("开设成功");
          window.location.reload();
        } else {
          ElMessage.success("开设成功");
        }
      })
    },
    // 关闭讨论区
    closeDiscussion(scope) {
      api.closeDiscussion(scope.row.id).then(res => {
        if (res.data.code === 20000) {
          ElMessage.success("关闭成功");
          window.location.reload();
        } else {
          ElMessage.success("关闭成功");
        }
      })
    },
    // 上传答案
    submitAnswer(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/submitAnswer");
    },
    // 查看答案
    viewAnswer(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/viewAnswer");
    },
    // 比较开始时间
    compareStart(index){
      const now = new Date()
      const start = new Date(this.tableData[index].start)
      return now>start
    },
    // 比较结束时间
    compareEnd(index) {
      const now = new Date()
      const end = new Date(this.tableData[index].end)
      return now > end
    },
    //恶意评分检测
    malicious(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/malicious");
    },
    // 查看代码作业详情
    showCodeInfo(scope) {
      this.$store.commit('setCodeId', scope.row.type);
      this.$router.push("/CodeInformation");
    },
    // 提交代码
    submitCode(scope) {
      this.$store.commit('setCodeId', scope.row.type);
      this.$router.push("/submissionResult");
    }
  },
  computed: {
    ...mapState(['courseNumber', 'role', 'homeworkNumber']),
  }
}
</script>

<style scoped>
</style>