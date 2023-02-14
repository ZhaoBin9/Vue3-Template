<template>
  <div :class="['layout-wrapper', { 'has-topbar': hasTopBar }]">
    <slot name="topBar"></slot>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* 全局布局组件 */
export default {
  data() {
    return {
      hasTopBar: false, // 页面是否存在TopBar
    }
  },
  mounted() {
    this.hasTopBar = !!document.querySelector('.topbar-wrapper')
  },
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: calc(100vw - 207px);
  height: 100%;
  display: flex;
  flex-direction: column;

  .layout-content {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
  }

  &.has-topbar {
    .layout-content {
      width: 100%;
      height: calc(100vh - 64px);
      overflow: auto;
    }
  }
}
</style>
