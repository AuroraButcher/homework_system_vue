<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <SideMenu></SideMenu>
        </el-aside>
        <el-main>
          <h1>你好</h1>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";

export default {
  components: {
    'SideMenu': SideMenu,
  },
}
</script>

<style>
body {
  background-image: url("../assets/Image_1.png");
}
</style>