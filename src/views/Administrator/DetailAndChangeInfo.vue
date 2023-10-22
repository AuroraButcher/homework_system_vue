<template>
  <div aria-label="A complete example of page header">
    <!--页头-->
    <el-page-header @back="onBack">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3"> 详细信息 </span>
          <el-tag>Detailed information</el-tag>
        </div>
      </template>

      <el-descriptions :column="1" size="large">
        <el-descriptions-item label="所属院系:">{{ Department }}</el-descriptions-item>
        <el-descriptions-item label="课程名称:">专业课程实训</el-descriptions-item>
        <el-descriptions-item label="教师姓名:">邸晓飞</el-descriptions-item>
        <el-descriptions-item label="教师邮箱:">xfDi@bjtu.edu.cn</el-descriptions-item>
        <el-descriptions-item label="课程简介:">{{ CourseIntroduction }}</el-descriptions-item>
      </el-descriptions>
    </el-page-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Department: "软件学院",
      CourseIntroduction: "《专业课程综合实训III》为软件工程专业综合实践模块的一门必修课程，课程设置在第五学期，是一门针对该学期所学《软件项目管理与产品运维》和《软件测试与质量保证》课程的实训课程。\n" +
          "          本课程旨在利用项目实训的方式，随着相关理论课程学习的深入，实践具体的软件工程项目管理及软件测试中的具体方法。"
    }
  },
  methods: {
    onBack() {
      window.location.href = "/administratorHome";
    }
  }
}
</script>

<style scoped>

</style>