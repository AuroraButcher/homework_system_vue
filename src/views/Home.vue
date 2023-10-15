<template>
  <div class="common-layout">
    <el-container>
      <!--头部-->
      <el-header class="header-style">
        <!--logo及名称-->
        <div class="logo-style">
          <img src="../assets/logo_1.png" alt="羲和作业互评系统" width="50">
          <span style="font-size: 25px;font-family:华文行楷,fangsong">羲和作业互评系统</span>
<!--          下拉框-->
          <el-dropdown class="dropdown">
            <el-button type="primary">
              {{showNumber}}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
import { ArrowDown } from '@element-plus/icons-vue'
import Cookie from 'js-cookie';


export default {
  data(){
    return{
      showNumber:Cookie.get('number'),
    }
  },
  components: {
    ArrowDown,
    'SideMenu': SideMenu,
  },
  methods:{
    logout(){
      Cookie.remove('number')
      //this.$store.set_token(store,'')
      window.location.href = "/";
    }
  }
}
</script>

<style scoped>
body {
  background-image: url("../assets/Image_1.png");
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.dropdown{
  margin-left: auto;
}
.header-style {
  /*高度*/
  height: 50px;
  /*背景颜色*/
  background-color: rgb(67, 142, 185);
  border-color: red;
  /*圆角*/
  border-radius: 5px;
}
.logo-style {
  display: flex;
  align-items: center;
}

.side-style {
  width: 200px;
}
</style>