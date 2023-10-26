<template>
  <el-card style="height: 100%">
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
    <div class="hang">
      <el-input v-model="courseName" placeholder="请输入课程名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="search">搜索</el-button>
    </div>
    <hr style="margin-top: 15px;margin-bottom: 15px">
    <el-table :data="tableData" style="width: 100%" :row-class-name="rowClassName">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="课程编号" prop="id" width="140px"></el-table-column>
      <el-table-column label="课程名称" prop="name" width="140px"></el-table-column>
      <el-table-column label="课程教师" prop="teacherName" width="140px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <!--TODO:修改对应的方法-->
          <el-button type="primary" link style="margin-left: 10px" @click="showDetailInfo(scope)">详情</el-button>
          <el-button type="primary" link style="margin-left: 10px" @click="change">修改</el-button>
          <el-button type="primary" link style="margin-left: 10px" @click="deleteCourse">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr>
    <el-pagination
      v-model:current-page="page.currentPage"
      v-model:page-size="page.pageSize"
      :total="page.total"
      @current-change="handlePageChange"
      :hide-on-single-page="false"/>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import api from "../../../api/index.js"
import {ElMessage} from "element-plus";

export default {
  name: "checkProgram",
  created() {
    api.showCourse(this.page).then(res=>{
      if(res.data.code===20000){
        this.page.total=res.data.data.classInfo.total
        this.tableData=res.data.data.classInfo.records
      }else{
        ElMessage.error(res.data.message);
      }
    })
  },
  components: {PageHeader},
  data(){
    return {
      head: '查看课程',
      courseName: '',
      tableData: [
        {
          "id": null,
          "info": null,
          "teacher": null,
          "name": null,
          "num": null,
          "currentNum": null,
          "teacherName": null
        }
      ],
      page:{
        currentPage:1,
        pageSize:10,
        total:100
      },
    }
  },
  methods: {
    showDetailInfo(scope) {
      this.$store.commit('setAdminViewCourse', scope.row.id);
      this.$router.push('/adminCourseInfo');

    },
    change() {
      this.$router.push('/changeCourseInfo');
    },
    deleteCourse() {

    },
    search(){

    },
    handlePageChange(){
      console.log(this.page.currentPage)
      api.showCourse(this.page).then(res=>{
        if(res.data.code===20000){
          console.log(res.data.data);
          this.page.total = res.data.data.classInfo.total;
          this.tableData = res.data.data.classInfo.records;
        }else {
          ElMessage.error(res.data.message);
        }
      })
    },
    //获取当前的行数
    rowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
      // console.log(row)
    },
  },
  computed:{
  }
}
</script>

<style scoped>
  .hang{
    display: flex;
  }
</style>