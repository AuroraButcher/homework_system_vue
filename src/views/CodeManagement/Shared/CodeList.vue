<template>
  <el-dialog v-model="dialog" center>
    <el-date-picker
        v-model="time"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="截止时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD hh:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
    />
    <div style="margin-top: 10px">
      <el-button type="primary" @click="check">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-dialog>
  <el-card>
    <template #header>
      <page-header :component='head'/>
    </template>
    <el-table :data="tableData" border style="width:100%" :row-class-name="rowClassName" :Key="key">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="题目名称" prop="title" width="200px">
        <template #default="scope">
          <el-link link @click="showDetailCodeInfo(scope)">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="start" width="200px"></el-table-column>
      <el-table-column label="结束时间" prop="end" width="200px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-link type="primary" link @click="submitCode(scope)" v-if="role === 'student'">提交</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="showSubmissionResult(scope)" v-if="role === 'student'">提交记录</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="assignHomework(scope)" v-if="role === 'teacher'">布置作业</el-link>
          <el-link type="primary" link style="margin-left: 10px" @click="similar(scope)" v-if="role === 'teacher'">代码查重</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!--横线-->
    <hr style="margin-top: 10px">
    <!--页码-->
    <el-pagination
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        :total="page.total"
        @current-change="handlePageChange()"
        :hide-on-single-page="false"/>
  </el-card>
</template>

<script>
import {mapState} from "vuex";
import api from "../../../api/index.js";
import PageHeader from "../../Base/PageHeader.vue";
import {ElMessage} from "element-plus";

export default {
  name: "checkProgram",
  components: {PageHeader},
  data() {
    return {
      head: '题目列表',
      courseName: '',
      key: 1,
      time:null,
      dialog:false,
      id:null,
      tableData: [
        {
          "id": null,
          "title": null,
          "start": null,
          "end": null,
        }
      ],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: null,
      },
    }
  },
  // 展示代码列表
  created() {
    this.getCodeList();
  },
  methods: {
    // 获取代码题目列表
    getCodeList() {
      api.getCodeList(this.page).then(response => {
        if (response.data.code === 20000) {
          this.page.total = response.data.data.list.total;
          this.tableData = response.data.data.list.records;
        } else {
          console.log("获取代码题目失败");
        }
      })
    },
    //展示代码题目的详细信息
    showDetailCodeInfo(scope) {
      this.$store.commit('setCodeId', scope.row.id);
      this.$router.push('/CodeInformation');
    },
    // 提交代码界面
    submitCode(scope) {
      this.$store.commit('setCodeId', scope.row.id);
      this.$router.push("/submitCode");
    },
    // 提交记录
    showSubmissionResult(scope) {
      this.$store.commit('setCodeId', scope.row.id);
      this.$router.push("/submissionResult");
    },
    // 处理页数改变
    handlePageChange() {
      this.getCodeList();
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //布置作业
    assignHomework(scope){
      this.id=scope.row.id
      this.dialog=true
    },
    cancel(){
      this.dialog=false
    },
    check(){
      const data={
        classNumber:this.courseNumber,
        start:this.time[0],
        end:this.time[1],
        type:this.id
      }
      console.log(data)
      api.assignCodeHomework(data).then(res=>{
        if(res.data.code===20000){
          ElMessage.success('添加成功')
          this.dialog=false
        }else {
          ElMessage.error('添加失败')
        }
      })

    }
  },
  computed: {
    ...mapState(['role', 'courseNumber'])
  }
}
</script>

<style scoped>

</style>