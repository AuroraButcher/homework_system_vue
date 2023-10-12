<template>
  <div class="common-layout">
    <el-container>
      <!--头部-->
      <el-header class="header-style">
        <!--logo及名称-->
        <div class="logo-style">
          <img src="../assets/XiHe.png" alt="羲和作业互评系统" width="50">
          <span style="font-size: 25px;font-family:华文行楷">羲和作业互评系统</span>
        </div>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside class="side-style">
          <SideMenu></SideMenu>
        </el-aside>
        <!--主内容-->
        <el-main class="main-style">
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

<style scoped>
body {
  background-image: url("../assets/Image_1.png");
}

.header-style {
  height: 50px;
  background-color: rgb(242, 242, 242);
}

.logo-style {
  display: flex;
  align-items: center;
}

.side-style {
  width: 200px;
}
</style>