<template>
  <!--管理员-->
  <div v-show="role === 'administrator'">
    <el-aside class="el-side">
      <!--总菜单-->
      <el-menu class="el-menu" router unique-opened :collapse="isCollapse" :collapse-transition="false">
        <a href="/adminHome" class="logo">
          <img src="../../assets/XiHe.png" alt="logo" class="image">
          <h1 class="header_1">羲和作业互评</h1>
        </a>
        <!--总菜单选项-->
        <el-menu-item index="/adminHome">
          <el-icon style="font-size: 32px">
            <HomeFilled/>
          </el-icon>
          <span>管理员端首页</span>
        </el-menu-item>

        <!--子菜单-->
        <el-sub-menu index="1">
          <template #title>
            <el-icon style="font-size: 32px">
              <Operation/>
            </el-icon>
            <span>用户管理</span>
          </template>
          <!--子菜单选项-->
          <el-menu-item class="el-menu-item">
            <el-icon>
              <View/>
            </el-icon>
            <span>用户列表</span>
          </el-menu-item>
          <el-menu-item class="el-menu-item">
            <el-icon>
              <Plus/>
            </el-icon>
            <span>添加用户</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon style="font-size: 32px">
              <Operation/>
            </el-icon>
            <span>课程管理</span>
          </template>
          <!--子菜单选项-->
          <el-menu-item class="el-menu-item" index="/adminViewCourse">
            <el-icon>
              <View/>
            </el-icon>
            <span>查看课程</span>
          </el-menu-item>
          <el-menu-item class="el-menu-item" index="/addCourse">
            <el-icon>
              <Plus/>
            </el-icon>
            <span>添加课程</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon style="font-size: 32px">
              <Notebook/>
            </el-icon>
            <span>作业管理</span>
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
        <el-sub-menu index="4">
          <template #title>
            <el-icon style="font-size: 32px">
              <EditPen/>
            </el-icon>
            <span>互评打分</span>
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
        <el-menu-item>
          <el-icon style="font-size: 32px">
            <bell/>
          </el-icon>
          <span>消息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>

  <!--教师-->
  <div v-show="role === 'teacher'">
    <el-aside class="el-side">
      <!--总菜单-->
      <el-menu class="el-menu" router unique-opened :collapse="isCollapse" :collapse-transition="false">
        <a href="/teacherHome" class="logo">
          <img src="../../assets/XiHe.png" alt="logo" class="image">
          <h1 class="header_1">羲和作业互评</h1>
        </a>
        <!--总菜单选项-->
        <el-menu-item index="/teacherHome">
          <el-icon style="font-size: 32px">
            <HomeFilled/>
          </el-icon>
          <span>教师端首页</span>
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
          <el-menu-item class="el-menu-item" index="/teacherViewCourse">
            <el-icon>
              <View/>
            </el-icon>
            <span>查看教授课程</span>
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
          <el-menu-item class="el-menu-item" index="/teaViewHomework">
            <el-icon>
              <FolderAdd/>
            </el-icon>
            <span>查看作业</span>
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
        <el-menu-item>
          <el-icon style="font-size: 32px">
            <bell/>
          </el-icon>
          <span>消息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>

  <!--学生-->
  <div v-show="role === 'student'">
    <el-aside class="el-side">
      <!--总菜单-->
      <el-menu class="el-menu" router unique-opened :collapse="isCollapse" :collapse-transition="false">
        <a href="/studentHome" class="logo">
          <img src="../../assets/XiHe.png" alt="logo" class="image">
          <h1 class="header_1">羲和作业互评</h1>
        </a>
        <!--总菜单选项-->
        <el-menu-item index="/studentHome">
          <el-icon style="font-size: 32px">
            <HomeFilled/>
          </el-icon>
          <span>学生端首页</span>
        </el-menu-item>

        <!--子菜单-->
        <el-sub-menu class="el-sub-menu" index="1">
          <template #title>
            <el-icon style="font-size: 32px">
              <Operation/>
            </el-icon>
            <span>课程</span>
          </template>
          <!--子菜单选项-->
          <el-menu-item class="el-menu-item" index="/studentViewCourse">
            <el-icon>
              <View/>
            </el-icon>
            <span>查看选修课程</span>
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
          <el-menu-item class="el-menu-item" index="stuViewHomework">
            <el-icon>
              <View/>
            </el-icon>
            <span>查看作业</span>
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
        <el-menu-item @click="drawer = true">
          <el-badge>
            <el-icon style="font-size: 32px">
              <bell/>
            </el-icon>
          </el-badge>
          <span>消息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
  <el-drawer v-model="drawer" title="消息" direction="rtl">
    <el-tabs style="width: 100%">
      <el-tab-pane label="全部" name="first">全部</el-tab-pane>
      <el-tab-pane label="已读信息" name="second">已读信息</el-tab-pane>
      <el-tab-pane label="未读信息" name="third">未读信息</el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>
<script>
import {Bell, DataAnalysis, EditPen, FolderAdd, HomeFilled, Notebook, Operation, Plus, View} from "@element-plus/icons-vue";
import {mapState} from "vuex";

export default {
  components: {Bell, DataAnalysis, FolderAdd, View, Plus, EditPen, Notebook, Operation, HomeFilled},
  props: ['isCollapse'],
  data() {
    return {
      drawer: null,
    }
  },
  computed: {
    ...mapState(['role'])
  }
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