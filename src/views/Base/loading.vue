<template>
  <div class="centered-container">
    <el-avatar :size="100" src="../../src/assets/gif.gif"/>
    <h1>加载中...</h1>
  </div>
</template>

<script>
export default {
  name: "loading"
}
</script>

<style scoped>
.centered-container{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>