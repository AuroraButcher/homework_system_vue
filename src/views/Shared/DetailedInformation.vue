<template>
  <!--页头-->
  <el-page-header @back="onBack">
    <template #content>
      <span> 详细信息 </span>
      <el-tag>Detailed information</el-tag>
    </template>
    <!--详细信息-->
    <el-descriptions column="2" border>
      <el-descriptions-item label="所属院系:">{{ Department }}</el-descriptions-item>
      <el-descriptions-item label="课程名称:">{{ Course }}</el-descriptions-item>
      <el-descriptions-item label="学分:">{{ Credit }}</el-descriptions-item>
      <el-descriptions-item label="学时:">{{ Hour }}</el-descriptions-item>
      <el-descriptions-item label="最大选修人数:" span="2">{{ MaxNumber }}</el-descriptions-item>
      <el-descriptions-item label="课程简介:">{{ CourseIntroduction }}</el-descriptions-item>
    </el-descriptions>
  </el-page-header>
</template>

<script>
export default {
  data() {
    return {
      // TODO:修改为展示动态传递课程信息
      Department: "软件学院",
      Course: "专业课程实训",
      Credit: 2,
      Hour: 32,
      MaxNumber: 180,
      Email: "xfDi@bjtu.edu.cn",
      CourseIntroduction: "《专业课程综合实训III》为软件工程专业综合实践模块的一门必修课程，课程设置在第五学期，是一门针对该学期所学《软件项目管理与产品运维》和《软件测试与质量保证》课程的实训课程。\n" +
          "          本课程旨在利用项目实训的方式，随着相关理论课程学习的深入，实践具体的软件工程项目管理及软件测试中的具体方法。"
    }
  },
  methods: {
    created() {
      // TODO:写从父组件获得信息的方法
    },
    onBack() {
      window.location.href = "/viewCourse";
    },
  }
}
</script>

<style scoped>
.el-descriptions-item_label {
  width: 100px;
}
</style>