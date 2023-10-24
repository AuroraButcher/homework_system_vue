<template>
  <el-card>
    <template #header>
      <!--页头-->
      <el-page-header @back="onBack">
        <template #content>
          <span> 查看课程 </span>
          <el-tag>Add course</el-tag>
        </template>
      </el-page-header>
    </template>
    <div class="hang">
      <el-input v-model="programName" placeholder="请输入课程名称" style="width: 220px;"></el-input>
      <el-button type="primary" style="margin-left: 10px">搜索</el-button>
    </div>
    <hr style="margin-top: 15px;margin-bottom: 15px">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="课程编号" prop="no" width="140px"></el-table-column>
      <el-table-column label="课程名称" prop="name" width="140px"></el-table-column>
      <el-table-column label="课程教师" prop="teacher" width="140px"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default>
          <el-button type="primary" link style="margin-left: 10px" @click="showDetailInfo">详情</el-button>
          <el-button type="primary" link style="margin-left: 10px" @click="showDetailInfo">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "checkProgram",
  data() {
    return {
      programName: '',
      tableData: [
        {
          no: 123,
          name: '嗡嗡嗡哇',
          teacher: 'Nick'
        },
      ]
    }
  },
  methods: {
    onBack() {
      window.location.href = "/teacherHome";
    },
    showDetailInfo() {
      console.log(this.$store.state.adminViewCourseNumber);
      this.$store.commit('setAdminViewCourse', this.tableData[0].no);
      console.log(this.$store.state.adminViewCourseNumber);
      window.location.href = "/teacherDetailedCourseInformation";
    }
  },
}
</script>

<style scoped>
.hang {
  display: flex;
}
</style>