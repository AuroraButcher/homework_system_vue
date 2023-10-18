<template>
  <change-password v-model="isChange" @changeCancel="isChange=false"/>
  <div class="common-layout">
    <el-container>
      <SideMenu :isCollapse="isCollapse"/>
      <el-container class="header-and-main">
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
            <el-breadcrumb-item :to="{ path: '/home' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>

          <!--下拉菜单-->
          <el-dropdown class="el-dropdown">
            <span class="el-dropdown-link">
              <el-avatar :size="40" src="src/assets/头像.jpg"/>
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>{{ showNumber }}</el-dropdown-item>
                <el-dropdown-item @click="changePassword">修改密码</el-dropdown-item>
                <el-dropdown-item @click="deleteAccount">注销账号</el-dropdown-item>
                <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";
import {ArrowDown, Expand, Fold} from "@element-plus/icons-vue";
import Cookie from "js-cookie";
import ChangePassword from "./ChangePassword.vue";
import deleteAccount from "./DeleteAccount.vue";

export default {
  computed: {
    deleteAccount() {
      return deleteAccount;
    }
  },
  components: {ChangePassword, ArrowDown, Fold, Expand, SideMenu},
  data() {
    return {
      isCollapse: false,
      showNumber: Cookie.get('number'),
      isChange: false,
    }
  },
  methods: {
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      Cookie.remove('number')
      window.location.href = "/";
    },
    changePassword(){
      this.isChange=true
    }
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
  background-color: rgb(242, 242, 242);
  .span{
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
</style>