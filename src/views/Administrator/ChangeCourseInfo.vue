<template>
  <!--页头-->
  <el-page-header @back="onBack">
    <template #content>
      <span> 修改课程信息 </span>
      <el-tag>Change course information</el-tag>
    </template>
  </el-page-header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onBack() {
      window.location.href = "/viewCourse";
    },
  }
}
</script>

<style scoped>

</style>