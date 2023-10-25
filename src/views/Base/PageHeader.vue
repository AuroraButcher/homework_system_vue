<template>
  <el-page-header title="返回" :content="this.component" @back="goBack"></el-page-header>
</template>

<script>
export default {
  name: "PageHeader",
  props:['component'],
  data(){
    return{

    }
  },
  methods:{
    // 回退上一层
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>