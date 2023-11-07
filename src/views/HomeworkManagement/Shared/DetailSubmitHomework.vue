<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--布置详情-->
    <detail/>
    <!--提交详情-->
    <el-divider content-position="left" border-style="dashed">提交内容</el-divider>
    <el-descriptions border :column="2">
      <el-descriptions-item label="学号">{{ studentNumber }}</el-descriptions-item>
      <el-descriptions-item label="答案">{{ answer }}</el-descriptions-item>
      <el-descriptions-item label="附件">files</el-descriptions-item>
      <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Detail from "./Detail.vue";
export default {
  name: "DetailSubmitHomework",
  components: {Detail, PageHeader},
  created() {

  },
  data() {
    return {
      head: '作业提交详情',
      id: null,
      answer: null,
      homeworkId: null,
      studentNumber: null,
      classId: null,
      submit: null,
      date: null,
      fileName: null,
      files: null,
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>