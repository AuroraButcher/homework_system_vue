<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <div class="hang">
      <el-input v-model="homeworkName" placeholder="请输入作业名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="search(this.homeworkName)">搜索</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="addHomework()" v-show="role==='teacher'">添加作业</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;margin-top: 10px" :row-class-name="rowClassName" :Key="key" :default-sort="{ prop: 'end', order: 'descending' }">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="作业编号" prop="id" width="100px" v-if="false"></el-table-column>
      <el-table-column label="作业名称" prop="name" width="200px">
        <template #default="scope">
          <el-link link @click="showDetailInfo(scope)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" prop="end" width="200px" sortable></el-table-column>
      <el-table-column label="操作" header-align="center">
        <el-table-column label="作业" width="100px">
          <template #default="scope">
            <el-link type="primary" link @click="showDetailInfo(scope)" v-show="role === 'student'">详情</el-link>
            <!--TODO：将布置作业添加附件写到添加界面-->
<!--            <el-link type="primary" link @click="showAppend(scope)" v-show="role==='teacher'">添加附件</el-link>-->
            <!--TODO：作业未开始，都可改；作业已经开始，无论是否结束，开始时间不可改-->
            <el-link type="primary" link @click="changeHomework(scope)" v-show="role==='teacher'">修改</el-link>
            <el-link type="primary" link style="margin-left: 10px" @click="deleteHomework(scope)" v-show="role==='teacher'">删除</el-link>
          </template>
        </el-table-column>
        <el-table-column label="提交" width="100px">
          <template #default="scope">
            <!--TODO：提交情况应该在作业开始之后再显示或者打开一页显示“尚未开始”-->
            <el-link type="primary" link @click="viewSubmitHomework(scope)" v-show="role==='teacher'">提交情况</el-link>
            <el-link type="primary" link @click="submitHomework(scope)" v-show="role==='student'&&submit[scope.row.index]===0">提交作业</el-link>
            <el-link type="success" link @click="resubmitHomework(scope)" v-show="role==='student'&&submit[scope.row.index]!==0">重新提交</el-link>
          </template>
        </el-table-column>
        <el-table-column label="互评" width="150px">
          <template #default="scope">
            <el-link type="primary" link @click="setEvaluation(scope)" v-show="role==='teacher'">互评设置</el-link>
            <el-link type="primary" link @click="evaluateHomework(scope)" v-show="role==='student'">互评作业</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分数">
          <template #default="scope">
            <el-link type="primary" link @click="showData(scope)">分数分布</el-link>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr v-if="role==='teacher'" style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-if="role==='teacher'"
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
          "id": null,
          "classId": null,
          "start": null,
          "end": null,
          "content": null,
          "resubmit": null,
          "fileName": null,
          "name": null,
          "score": null,
        }
      ],
      page: {
        classID: '',
        pageNo: 1,
        pageSize: 10,
        total: null,
        studentID:Cookie.get('number'),
      },
      submit:[],
    }
  },
  // 展示作业
  created() {
    this.page.classID=this.courseNumber;
    if(this.role==='teacher') {
      api.getHomeworkList(this.page).then(res => {
        if (res.data.code === 20000) {
          //设置记录总数
          this.page.total = res.data.data.homeworkInfo.total;
          //设置表数据
          this.tableData = res.data.data.homeworkInfo.records;
        } else {
          console.log("查看作业列表失败");
        }
      })
    }else {
      // TODO：要改，急
      api.stuViewHomework(this.page).then(res=>{
        if (res.data.code === 20000) {
          //设置表数据
          this.tableData = res.data.data.homeworkInfo;
          this.submit = res.data.data.isSubmitted;
        } else {
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
                  // TODO：？？？
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
    //互评作业
    evaluateHomework(scope){
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push('/evaluateHomework');
    },
    // 处理页数改变
    handlePageChange() {
      // TODO：检查，可能有问题
      api.getHomeworkList(this.page).then(res => {
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
    // 分数分布
    showData(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/distribution");
    },
    // 互评设置
    setEvaluation(scope) {
      this.$store.commit('setHomeworkNumber', scope.row.id);
      this.$router.push("/setDistribution");
    }
  },
  computed: {
    ...mapState(['courseNumber', 'role', 'homeworkNumber'])
  }
}
</script>

<style scoped>

</style>