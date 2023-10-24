<template>
  <el-card class="box-card">
    <template #header>
      <!--页头-->
      <page-header :component="head"></page-header>
    </template>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="课程编号:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="课程名称:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="所属院系:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="学分:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="学时:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="最大选修人数:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="授课教师:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="教师邮箱:">
        <el-input></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="课程简介:">
        <el-input></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <el-button>修改</el-button>
  </el-card>
</template>

<script>
import PageHeader from "../Shared/PageHeader.vue";
export default {
  components: {PageHeader},
  data() {
    return {
      head:'查看课程'
    };
  },
  methods: {
    onBack() {
      window.location.href = "/adminViewCourse";
    },
  }
}
</script>

<style scoped>

</style>