<template>
  <div class="shell">
    <a href="#" class="box">
      <el-icon>
        <Expand/>
      </el-icon>
      <span>展开</span></a>
    <a href="#" class="box">
      <el-icon>
        <UserFilled/>
      </el-icon>
      <span>昵称</span></a>
    <a href="#" class="box">
      <el-icon>
        <HomeFilled/>
      </el-icon>
      <span>首页</span></a>
    <a href="#" class="box">
      <el-icon>
        <Bell/>
      </el-icon>
      <span>提醒</span></a>
    <a href="#" class="box">
      <el-icon>
        <Star/>
      </el-icon>
      <span>收藏</span></a>
    <a href="#" class="box">
      <el-icon>
        <Message/>
      </el-icon>
      <span>消息</span></a>
    <a href="#" class="box">
      <el-icon>
        <DArrowRight/>
      </el-icon>
      <span>退出</span></a>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}

body {
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  align-items: center;
}

.shell {
  width: 70px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(26, 34, 77);
  border-radius: 10px;
  transition: .3s;
  overflow: hidden;
}

.box {
  display: block;
  height: 15%;
  width: 85%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: .3s;
  color: rgb(255, 255, 255);
}

.box i {
  font-size: 50px;
  position: absolute;
  margin: 5px 0 0 5px;
}

.box:nth-child(1)::before,
.box:nth-child(S)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(137, 135, 180);
  position: absolute;
  bottom: -10px;
}

.box span {
  position: relative;
  top: 22px;
  left: 80px;
  font: 500 20px '';
  opacity: 0;
  transition: .1s;
}

.shell:hover {
  width: 200px;
}

.box:hover {
  background-color: rgb(42, 27, 175);
  color: rgb(255, 255, 255);
}

.shell:hover span {
  opacity: 1;
}

</style>