<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <detail/>
    <p></p>
    <el-descriptions :column="2" border>
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
  components: {Detail,PageHeader,Markdown},
  data(){
    return{
      head:'作业提交详情',
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>