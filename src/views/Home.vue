<template>
  <div class="app">
    <SideMenu>
      <p>这里是侧边栏的内容。</p>
      <h1>你你----你</h1>
    </SideMenu>
    <div class="content">
      <!-- 这里是页面主要的内容部分 -->
    </div>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";

export default {
  components: {
    'SideMenu': SideMenu,
  },
}
</script>

<style>
.app {
  display: flex;
  flex-direction: row;
}
</style>