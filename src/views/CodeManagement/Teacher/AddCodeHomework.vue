<template>
  <el-card>
    <template #header>
      <!--页头-->
      <page-header :component='head'/>
    </template>
  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";

export default {
  components: {PageHeader},
  data() {
    return {
      head: '添加代码作业',
    }
  }
}
</script>

<style scoped>

</style>