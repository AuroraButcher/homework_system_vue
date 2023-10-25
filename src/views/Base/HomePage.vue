<template>
  <div v-show="role === 'administrator'">
    <el-card class="box-card">
      <template #header>
        <h1>欢迎进入羲和系统-管理员首页</h1>
      </template>
    </el-card>
  </div>

  <div v-show="role === 'teacher'">
    <el-card class="box-card">
      <template #header>
        <h1>欢迎进入羲和系统-教师首页</h1>
      </template>
    </el-card>
  </div>

  <div v-show="role === 'student'">
    <el-card class="box-card">
      <template #header>
        <h1>欢迎进入羲和系统-学生首页</h1>
      </template>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState(['role'])
  }
}
</script>

<style scoped>

</style>