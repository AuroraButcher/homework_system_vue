<template>
  <el-aside class="el-side">
    <!--总菜单-->
    <el-menu class="el-menu" router unique-opened :collapse="isCollapse" :collapse-transition="false">
      <a href="/home" class="logo">
        <img src="../assets/XiHe.png" alt="logo" class="image">
        <h1 class="header_1">羲和作业互评</h1>
      </a>
      <!--总菜单选项-->
      <el-menu-item index="/home">
        <el-icon style="font-size: 32px">
          <HomeFilled/>
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <!--子菜单-->
      <el-sub-menu index="1">
        <template #title>
          <el-icon style="font-size: 32px">
            <Operation/>
          </el-icon>
          <span>课程</span>
        </template>
        <!--子菜单选项-->
        <el-menu-item class="el-menu-item" index="/about">
          <el-icon>
            <Operation/>
          </el-icon>
          <span>课程1</span>
        </el-menu-item>
        <el-menu-item class="el-menu-item" index="/abc">
          <el-icon>
            <Operation/>
          </el-icon>
          <span>课程2</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
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
      <el-sub-menu index="3">
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
import {EditPen, HomeFilled, Notebook, Operation} from "@element-plus/icons-vue";
export default {
  components: {EditPen, Notebook, Operation, HomeFilled},
  props: ['isCollapse'],
}
</script>

<style scoped>
/*整个侧边*/
.el-side {
  background-color: rgb(67, 142, 185);
  height: 100vh;
  width: auto;
}

/*侧边菜单*/
.el-menu {
  background-color: rgb(67, 142, 185);
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
  background-color: rgb(67, 142, 185);
}

/*.el-menu--collapse表示隐藏*/
.el-menu.el-menu--collapse {
  background-color: rgb(67, 142, 185);
  border-right: none;
  width: 64px;

  .header_1 {
    display: none;
  }
}
</style>