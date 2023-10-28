<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>

  </el-card>
</template>

<script>
import PageHeader from "../../Base/PageHeader.vue";

export default {
  components: {PageHeader},
  data() {
    return {
      head: "提交作业",
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>