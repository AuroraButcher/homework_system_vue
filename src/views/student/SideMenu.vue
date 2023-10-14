<template>
  <div class="left-nav">
    <div class="nav-logo">
      <span>菜单</span>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-button v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true">
          <el-icon>
            <Fold/>
          </el-icon>
        </el-button>
        <el-button v-show="isCollapse" class="el-icon-s-fold shrinkBtn" @click="isCollapse=false">
          <el-icon>
            <Expand/>
          </el-icon>
        </el-button>
      </el-radio-group>
    </div>
    <el-menu class="el-menu-vertical-demo"
             :unique-opened="true"
             router
             background-color=rgb(242,242,242)
             text-color=rgb(0,0,0)
             :collapse="isCollapse">
      <el-menu-item index="/home">
        <el-icon>
          <HomeFilled/>
        </el-icon>
        <span style="color: black;">首页</span>
      </el-menu-item>
      <el-sub-menu v-for="(item,index) in menuList" :index="'/' + index" :key="index">
        <template #title>
          <el-icon>
            <DataBoard/>
          </el-icon>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item v-for="(subItem,index) in item.children " :index=" '/' + subItem.path " :key="index">
          <span>{{ subItem.authName }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {DataBoard, Expand, Fold, HomeFilled} from "@element-plus/icons-vue";

export default {
  components: {DataBoard, HomeFilled, Fold, Expand},
  data() {
    return {
      menuList: [
        {
          id: 0,
          authName: "课程管理",
          icon: "el-icon-s-custom",
          children: [
            {
              authName: "用户与部门管理",
              id: 1,
              path: "login",
              parentId: 0
            },
            {
              authName: "通讯录设置",
              id: 2,
              path: "adrbook",
              parentId: 0
            }
          ]
        },
        {
          id: 1,
          authName: "作业管理",
          icon: "el-icon-s-claim",
          children: [
            {
              authName: "数据概览",
              id: 1,
              path: "overview",
              parentId: 1
            },
            {
              authName: "员工活跃数据",
              id: 2,
              path: "employees",
              parentId: 1
            }
          ]
        },
        {
          id: 2,
          authName: "互评打分",
          icon: "el-icon-office-building",
          children: [
            {
              authName: "企业信息管理",
              id: 1,
              path: "information",
              parentId: 2
            },
            {
              authName: "权限管理",
              id: 2,
              path: "authority",
              parentId: 2
            },
            {
              authName: "团队邀请设置",
              id: 3,
              path: "team",
              parentId: 2
            },
            {
              authName: "安全策略",
              id: 4,
              path: "safety",
              parentId: 2
            },
            {
              authName: "管理员日志",
              id: 5,
              path: "journal",
              parentId: 2
            }
          ]
        }
      ],
      isCollapse: false
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.left-nav {
  .nav-logo {
    height: 60px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
    margin-top: 16px;


    .logo {
      font-size: 30px;
    }

    img {
      width: 28px;
      margin: 5px;
    }

    .el-radio-group {
      font-size: 20px;
      margin-top: 20px;
      margin-left: 21px;
      .shrinkBtn {
        position: fixed;
        left: -29px;
        color: rgb(0, 0, 0);
        margin-left: 100px;
        transition: 0.5s;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .el-menu-vertical-demo {
    border: none;
    .el-menu-item {
      span {
        color: rgb(0, 0, 0);
        font-size: 16px;
      }
    }
    .el-submenu {
      span {
        color: rgb(0, 0, 0);
        font-size: 16px;
      }
      .el-menu-item {
        span {
          color: rgb(0, 0, 0);
          font-size: 14px;
        }
      }
    }
  }
}
</style>