<template>
  <el-page-header title="返回" :content="this.component" @back="goBack">
  </el-page-header>
</template>

<script>
export default {
  name: "PageHeader",
  props:['component'],
  data(){
    return{
      content:this.component
    }
  },
  methods:{
    goBack(){
      history.back()
    }
  }
}
</script>

<style scoped>

</style>