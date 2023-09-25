<template>
  <div class="sidebar">
    <h1>你你你你你</h1>
    <slot>></slot>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f8f9fa;
  overflow-y: auto;
}
</style>