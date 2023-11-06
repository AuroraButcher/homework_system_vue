<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <detail/>
    <el-descriptions :column="1" border title="提交内容" style="margin-top: 10px">
      <el-descriptions-item label="作业名称:">123</el-descriptions-item>
      <el-descriptions-item label="是否允许多次提交:">123</el-descriptions-item>
      <el-descriptions-item label="开始时间:">123</el-descriptions-item>
      <el-descriptions-item label="截止时间:">123</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Detail from "./Detail.vue";
export default {
  name: "DetailSubmitHomework",
  components: {Detail, PageHeader},
  data() {
    return {
      head: '作业提交详情',
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>