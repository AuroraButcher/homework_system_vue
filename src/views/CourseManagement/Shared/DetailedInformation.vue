<template>
  <el-card>
    <template #header>
      <page-header :component="head"/>
    </template>
    <!--详细信息-->
    <el-descriptions :column="2" border>
      <el-descriptions-item label="课程名称:">{{ CourseName }}</el-descriptions-item>
      <el-descriptions-item label="授课教师:">{{ Teacher }}</el-descriptions-item>
      <el-descriptions-item label="最大选修人数:">{{ MaxNumber }}</el-descriptions-item>
      <el-descriptions-item label="选课人数:">{{ ChooseNum }}</el-descriptions-item>
      <el-descriptions-item label="课程简介:">{{ CourseIntroduction }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import {mapState} from 'vuex';
import PageHeader from "../../Base/PageHeader.vue";
import api from '../../../api/index.js'

export default {
  components: {PageHeader},
  created() {
    if (this.courseNumber !== null) {
      api.showCourseDetail(this.courseNumber).then(res => {
        if (res.data.code === 20000) {
          this.CourseName = res.data.data.info.name
          this.MaxNumber = res.data.data.info.num
          this.CourseIntroduction = res.data.data.info.info
          this.Teacher = res.data.data.info.teacherName
          this.ChooseNum = res.data.data.info.currentNum
        }
      })
    }
  },
  data() {
    return {
      head: '课程详情',
      CourseNumber: null,
      CourseName: null,
      MaxNumber: null,
      Teacher: null,
      ChooseNum: null,
      CourseIntroduction: null,
    }
  },
  methods: {},
  computed: {
    ...mapState(['courseNumber'])
  }
}
</script>

<style scoped>
</style>