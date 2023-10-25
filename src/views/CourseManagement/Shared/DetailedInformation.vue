<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--详细信息-->
    <el-descriptions :column="2" border>
      <el-descriptions-item label="课程编号:">{{ adminViewCourseNumber }}</el-descriptions-item>
      <el-descriptions-item label="课程名称:">{{ CourseName }}</el-descriptions-item>
      <el-descriptions-item label="所属院系:">{{ Department }}</el-descriptions-item>
      <el-descriptions-item label="学分:">{{ Credit }}</el-descriptions-item>
      <el-descriptions-item label="学时:">{{ Hour }}</el-descriptions-item>
      <el-descriptions-item label="最大选修人数:">{{ MaxNumber }}</el-descriptions-item>
      <el-descriptions-item label="授课教师:">{{ Teacher }}</el-descriptions-item>
      <el-descriptions-item label="教师邮箱:">{{ Email }}</el-descriptions-item>
      <el-descriptions-item label="课程简介:">{{ CourseIntroduction }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import {mapState} from 'vuex';
import PageHeader from "../../Base/PageHeader.vue";

export default {
  components: {PageHeader},
  data() {
    return {
      head: '课程详情',
      CourseNumber: 1,
      CourseName: "专业课程实训",
      Department: "软件学院",
      Credit: 2,
      Hour: 32,
      MaxNumber: 180,
      Teacher: "邸晓飞",
      Email: "xfDi@bjtu.edu.cn",
      CourseIntroduction: "《专业课程综合实训III》为软件工程专业综合实践模块的一门必修课程，课程设置在第五学期，是一门针对该学期所学《软件项目管理与产品运维》和《软件测试与质量保证》课程的实训课程。\n" +
          "本课程旨在利用项目实训的方式，随着相关理论课程学习的深入，实践具体的软件工程项目管理及软件测试中的具体方法。"
    }
  },
  methods: {},
  computed: {
    ...mapState(['adminViewCourseNumber'])
  }
}
</script>

<style scoped>
.el-descriptions-item_label {
  width: 100px;
}
</style>