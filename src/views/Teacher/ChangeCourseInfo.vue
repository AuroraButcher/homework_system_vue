<template>
  <el-card class="box-card">
    <template #header>
      <!--页头-->
      <el-page-header @back="onBack">
        <template #content>
          <span> 修改课程信息 </span>
          <el-tag>Change course information</el-tag>
        </template>
      </el-page-header>
    </template>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onBack() {
      window.location.href = "/teacherViewCourse";
    },
  }
}
</script>

<style scoped>

</style>