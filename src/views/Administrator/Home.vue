<template>
  <!--修改密码、注销账户-->
  <ChangePassword v-model="isChange" @changeCancel="isChange=false"/>
  <DeleteAccount v-model="isDelete" @deleteAccount="isDelete=false"/>
  <!--首页-->
  <div class="common-layout">
    <el-container>
      <AdministratorSideMenu :isCollapse="isCollapse"></AdministratorSideMenu>
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
            <el-breadcrumb-item :to="{ path: '/administratorHome' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>待改</el-breadcrumb-item>
            <el-breadcrumb-item>待改</el-breadcrumb-item>
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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdministratorSideMenu from "../Administrator/SideMenu.vue";
import DeleteAccount from "../Shared/DeleteAccount.vue";
import ChangePassword from "../Shared/ChangePassword.vue";
import Cookie from "js-cookie";
import {ArrowDown, Expand, Fold} from "@element-plus/icons-vue";

export default {
  components: {Fold, Expand, ArrowDown, ChangePassword, DeleteAccount, AdministratorSideMenu},
  data() {
    return {
      isCollapse: false,
      showNumber: Cookie.get('number'),
      isChange: false,
      isDelete: false,
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
    changePassword() {
      this.isChange = true;
    },
    deleteAccount() {
      this.isDelete = true;
    }
  },
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
</style>