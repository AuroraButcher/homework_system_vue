<template>
  <el-aside class="el-side">
    <!--总菜单-->
    <el-menu class="el-menu" router unique-opened :collapse="isCollapse" :collapse-transition="false">
      <a href="/administratorHome" class="logo">
        <img src="../../assets/XiHe.png" alt="logo" class="image">
        <h1 class="header_1">羲和作业互评</h1>
      </a>
      <!--总菜单选项-->
      <el-menu-item index="/administratorHome">
        <el-icon style="font-size: 32px">
          <HomeFilled/>
        </el-icon>
        <span>管理员端首页</span>
      </el-menu-item>

      <!--子菜单-->
      <el-sub-menu class="el-sub-menu" index="1">
        <template #title>
          <el-icon style="font-size: 32px">
            <Operation/>
          </el-icon>
          <span>课程管理</span>
        </template>
        <!--子菜单选项-->
        <el-menu-item class="el-menu-item" index="/">
          <el-icon>
            <View/>
          </el-icon>
          <span>查看课程</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item" index="/detailedInformationAndChange">
          <el-icon>
            <Plus/>
          </el-icon>
          <span>添加课程</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu class="el-sub-menu" index="2">
        <template #title>
          <el-icon style="font-size: 32px">
            <Notebook/>
          </el-icon>
          <span>作业</span>
        </template>
        <!--子菜单选项-->
        <el-menu-item class="el-menu-item">
          <el-icon>
            <Notebook/>
          </el-icon>
          <span>作业1</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item">
          <el-icon>
            <Notebook/>
          </el-icon>
          <span>作业2</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu class="el-sub-menu" index="3">
        <template #title>
          <el-icon style="font-size: 32px">
            <EditPen/>
          </el-icon>
          <span>互评</span>
        </template>
        <!--子菜单选项-->
        <el-menu-item class="el-menu-item">
          <el-icon>
            <EditPen/>
          </el-icon>
          <span>互评1</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item">
          <el-icon>
            <EditPen/>
          </el-icon>
          <span>互评2</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script>
import {EditPen, HomeFilled, Notebook, Operation, Plus, View} from "@element-plus/icons-vue";

export default {
  components: {View, Plus, EditPen, Notebook, Operation, HomeFilled},
  props: ['isCollapse'],
}
</script>

<style scoped>
/*整个侧边*/
.el-side {
  background-color: rgb(112, 188, 210);
  height: 100vh;
  width: auto;
}

/*侧边菜单*/
.el-menu {
  background-color: rgb(112, 188, 210);
  border-right: none;
  width: 200px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: black;
}

.image {
  height: 32px;
}

.el-menu-item {
  background-color: rgb(112, 188, 210);
}

.el-menu-item:hover {
  background-color: rgb(230, 230, 250);
}

/*.el-menu--collapse表示隐藏*/
.el-menu.el-menu--collapse {
  background-color: rgb(112, 188, 210);
  border-right: none;
  width: 64px;

  .header_1 {
    display: none;
  }
}
</style>