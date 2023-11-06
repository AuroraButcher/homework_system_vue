<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <detail/>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";
import Detail from "./Detail.vue";

export default {
  components: {Detail, PageHeader},
  data() {
    return {
      head: '作业详情',
    }
  },
}
</script>

<style scoped>

</style>