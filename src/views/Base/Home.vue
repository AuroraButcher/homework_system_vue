<template>
  <!--修改密码-->
  <ChangePassword v-model="isChange" @changeCancel="isChange=false"/>
  <!--首页-->
  <div class="common-layout">
    <el-container>
      <!--侧边栏-->
      <el-aside class="el-side">
        <SideMenu :isCollapse="isCollapse"></SideMenu>
      </el-aside>
      <el-container class="header-and-main">
        <!--头部-->
        <el-header class="el-header">
          <!--图标-->
          <el-icon class="el-icon" style="font-size: 28px" @click="changeIsCollapse">
            <Expand v-show="isCollapse"/>
            <Fold v-show="!isCollapse"/>
          </el-icon>
          <div>
            <span v-show="isCollapse" class="span">展开</span>
            <span v-show="!isCollapse" class="span">收起</span>
          </div>
          <!--面包屑-->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item,index) in $route.matched"
                :key="index"
                :to="{ path: item.path }">{{ item.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!--下拉菜单-->
          <el-dropdown class="el-dropdown">
            <span class="el-dropdown-link">
              <el-avatar :size="40" :src="avatar"/>
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>{{ showNumber }}</el-dropdown-item>
                <el-dropdown-item @click="changePassword">修改密码</el-dropdown-item>
                <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main class="el-main">
          <el-scrollbar height="calc(100vh-60px">
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";
import ChangePassword from "../UserManagerment/Shared/ChangePassword.vue";
import Cookie from "js-cookie";
import {ArrowDown, Expand, Fold} from "@element-plus/icons-vue";
import {mapState} from "vuex";
import avatar from '../../assets/头像.jpg'

export default {
  components: {Fold, Expand, ArrowDown, ChangePassword, SideMenu},
  data() {
    return {
      isCollapse: false,
      showNumber: Cookie.get('number'),
      isChange: false,
      isDelete: false,
      avatar: avatar,
    }
  },
  methods: {
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      Cookie.remove('number')
      this.$router.push('/');
    },
    changePassword() {
      this.isChange = true;
    },
  },
  computed: {
    ...mapState(['role'])
  }
}
</script>

<style scoped>
.header-and-main {
  flex-direction: column;
}
.el-header {
  display: flex;
  align-items: center;
  border-bottom-style: solid;
  border-width: 2px;
//background-color: rgb(176 226 255);

  .span {
    margin-right: 10px;
  }

  .el-icon {
    margin-right: 5px;
  }
}

.el-dropdown {
  margin-left: auto;
  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.el-main {
  padding: 0;
  overflow-y: hidden;
  height: calc(100vh - 60px);
}
/*整个侧边*/
.el-side {
  background-color: rgb(180, 204, 217);
  height: 100vh;
  width: auto;
}
</style>