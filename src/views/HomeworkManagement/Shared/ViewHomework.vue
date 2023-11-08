<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-input @keyup.enter="search" v-model="homeworkName" placeholder="请输入作业名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="search(this.homeworkName)">搜索</el-button>
      <el-button type="primary" style="margin-left: 800px" @click="addHomework()" v-show="role==='teacher'">添加作业</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="作业编号" prop="id" width="100px" v-if="false"></el-table-column>
      <el-table-column label="作业名称" prop="name" width="200px"></el-table-column>
      <el-table-column label="截止时间" prop="end" width="300px"></el-table-column>
      <el-table-column label="提交情况" prop="submit" width="300px" v-if="false"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link style="margin-left: 10px" @click="showDetailInfo(scope)">详情</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="showAppend(scope)" v-show="role==='teacher'">添加附件</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="viewSubmitHomework(scope)" v-show="role==='teacher'">提交情况</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="changeHomework(scope)" v-show="role==='teacher'">修改</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="deleteHomework(scope)" v-show="role==='teacher'">删除</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="submitHomework(scope)" v-show="role==='student'&&submit[scope.row.index]===0">提交作业</el-link>
          <el-link type="success" link style="margin-left: 10px" @click="resubmitHomework(scope)" v-show="role==='student'&&submit[scope.row.index]!==0">重新提交</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="showData(scope)">分数分布</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="evaluateHomework(scope)" v-show="role==='student'">互评作业</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-model:current-page="page.pageNo"
        v-model:page-size="page.pageSize"
        :total="page.total"
        @current-change="handlePageChange"
        :hide-on-single-page="false"/>
  </el-card>

  <!--上传附件的弹出框-->
  <el-dialog v-model="dialogFileVisible" title="为作业添加附件">
    <el-upload action="/homework/addFile" :auto-upload="false" :file-list="fileList" :on-change="handleChange">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button type="success" style="margin-left: 10px" @click="submitUpload">上传文件</el-button>
      <template #tip>
        <div>文件小于5Mb</div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api";
import {ElMessage, ElMessageBox} from "element-plus";
import {mapState} from "vuex";
import Cookie from "js-cookie";
import * as echarts from "echarts";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "作业列表",
      homeworkName: '',
      key: 1,
      // 是否显示文件上传弹出框
      dialogFileVisible: false,
      // 文件列表
      fileList: [],
      tableData: [
        {
          "id": 1,
          "classId": 2,
          "start": 23,
          "end": 23,
          "title": 23,
          "content": null,
          "resubmit": 23,
          // "currentNumber":null,
          // "result":null,
        }
      ],
      page: {
        classID: '',
        pageNo: 1,
        pageSize: 15,
        total: 100,
        studentID:Cookie.get('number'),
      },
      submit:[],
    }
  },
  // 展示作业
  created() {
    this.page.classID=this.courseNumber
    if(this.role==='teacher') {
      api.getHomeworkList(this.page).then(res => {
        if (res.data.code === 20000) {
          //设置记录总数
          this.page.total = res.data.data.homeworkInfo.total;
          //设置表数据
          this.tableData = res.data.data.homeworkInfo.records;
        } else {
          ElMessage.error(res.data.message);
        }
      })
    }else {
      api.stuViewHomework(this.page).then(res=>{
        if(res.data.code===20000){
          //设置记录总数
          this.page.total = res.data.data.homeworkInfo.total;
          //设置表数据
          this.tableData = res.data.data.homeworkInfo.records;
          this.submit=res.data.data.isSubmitted
        }else{
          ElMessage.error(res.data.message);
        }
      })
    }
  },
  methods: {
    // 添加作业
    addHomework(){
      this.$router.push('/teaAssignHomework');
    },
    //搜索作业
    search(name) {

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
    //删除课程
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
    // 处理文件改变
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    showAppend(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.dialogFileVisible = true;
    },
    // 上传附件
    submitUpload() {
      const param = new FormData();
      param.append("id", this.homeworkNumber);
      param.append("classID", this.courseNumber);
      this.fileList.forEach(val => {
        param.append("multipartFile", val.raw);
      })
      api.addHomeworkFile(param).then(res => {
        if (res.data.code === 20000) {
          ElMessage.success("上传成功");
        }else {
          ElMessage.error("上传失败");
        }
      })
    },
    // 查看提交情况
    viewSubmitHomework(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push('/homeworkCondition');
    },
    // 提交作业
    submitHomework(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$store.commit('setHomeworkID',null);
      this.$store.commit('setIndex', scope.row.index);
      this.$router.push('/submitHomework');
    },
    //重新提交作业
    resubmitHomework(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$store.commit('setIndex', scope.row.index);
      if(this.submit[scope.row.index]!==0){
        this.$store.commit('setHomeworkID', this.submit[scope.row.index]);
      }
      this.$router.push('/submitHomework');
    },
    //互评作业
    evaluateHomework(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push('/evaluateHomework');
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
    showData(scope) {
      this.$router.push("/distribution");
    }
  },
  computed: {
    ...mapState(['courseNumber', 'role', 'homeworkNumber'])
  }
}
</script>

<style scoped>

</style>