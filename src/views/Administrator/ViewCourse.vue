<template>
  <!--页头-->
  <el-page-header @back="onBack">
    <template #content>
      <span> 添加课程 </span>
      <el-tag>Add course</el-tag>
    </template>
  </el-page-header>
  <div class="hang">
    <el-input v-model="programName" style="width: 220px;"></el-input>
    <el-button style="margin-left: 10px">搜索</el-button>
    <el-button style="margin-left: auto">添加课程</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="课程编号" prop="no" width="140px"></el-table-column>
    <el-table-column label="课程名称" prop="name" width="140px"></el-table-column>
    <el-table-column label="课程教师" prop="teacher" width="140px"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default>
        <el-link type="primary" href="/detailedCourseInformation" :underline="false">详情</el-link>
        <el-link type="primary" href="/changeCourseInformation" :underline="false" style="margin-left: 10px">修改</el-link>
        <el-button type="primary" link style="margin-left: 10px">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "checkProgram",
  props:['tableData'],
  data(){
    return{
      programName:'',
      tableData:[
        {
          no:123,
          name:'嗡嗡嗡哇',
          teacher:'Nick'
        },
      ]
    }
  },
  methods: {
    onBack() {
      window.location.href = "/administratorHome"
    },
    detail() {
      this.$emit('showDetail', this.tableData);
    },

  },
}
</script>

<style scoped>
  .hang{
    display: flex;
  }
</style>