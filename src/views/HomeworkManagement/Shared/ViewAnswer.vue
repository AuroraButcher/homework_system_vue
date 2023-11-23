<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--布置作业详情-->
    <el-divider content-position="left">作业</el-divider>
    <detail></detail>
    <!--答案详情-->
    <el-divider content-position="left">答案</el-divider>
    <answer></answer>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Detail from "./Detail.vue";
import Answer from "./Answer.vue";

export default {
  components: {Answer, Detail, PageHeader},
}
</script>

<style scoped>

</style>