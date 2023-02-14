<template>
  <section class="base-layout">
    <NavMenu />
    <div class="wrapper">
      <TopBar />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script setup>
import NavMenu from './components/NavMenu.vue'
</script>

<style lang="scss" scoped>
.base-layout {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  ::v-deep .nav-menu-wrapper {
    position: absolute;
    left: 0;
    top: 0;
  }
  .wrapper {
    position: absolute;
    right: 0;
    left: 240px;
  }
  .content {
    padding: 24px;
  }
}
</style>
