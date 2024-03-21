<template>
  <el-card>
    <div>
      <!--轮播图-->
      <!--      <el-carousel interval="4000" type="card" height="400px">
              <el-carousel-item v-for="item in image" :key="item">
                <img :src="item" alt="null" style="width: 100%">
              </el-carousel-item>
            </el-carousel>-->
    </div>
    <!--标题内容-->
    <el-divider></el-divider>
    <h1 v-show="role === 'administrator'">欢迎您，亲爱的管理员</h1>
    <h1 v-show="role === 'teacher'">欢迎进入羲和系统-教师首页</h1>
    <h1 v-show="role === 'student'">欢迎您进入羲和系统学生首页，同学您好</h1>
  </el-card>
</template>

<script>
import {mapState} from "vuex";
/*import jpg1 from '../../assets/1.jpg'
import jpg2 from '../../assets/2.jpg'
import jpg3 from '../../assets/3.jpg'
import jpg4 from '../../assets/4.jpg'
import jpg5 from '../../assets/5.jpg'*/

export default {
  /*data() {
    return {
      image: [
        jpg1,
        jpg2,
        jpg3,
        jpg4,
        jpg5,
      ]
    }
  },*/
  computed: {
    ...mapState(['role'])
  }
}
</script>

<style scoped>

</style>