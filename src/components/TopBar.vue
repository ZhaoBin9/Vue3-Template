<template>
  <div class="topbar-wrapper">
    <!-- 返回 -->
    <div class="left" @click="handleBack">
      <template v-if="needBack">
        <span :class="['iconfont', 'icon-fanhuijiantou']"></span>
        <span class="title">{{ title }}</span>
      </template>
    </div>
  </div>
</template>

<script>
/* 顶部导航条组件 */
export default {
  data() {
    return {}
  },
  props: {
    // 页面标题
    title: {
      type: String,
      default: '返回选择基地',
    },
    // 返回 url
    backUrl: {
      type: String,
      default: '',
    },
    // 是否显示返回按钮
    needBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 返回上一页
    handleBack() {
      if (this.backUrl) this.$router.push(this.backUrl)
      else this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.topbar-wrapper {
  width: 100%;
  height: 64px;
  padding: 0 30px;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(72, 87, 109, 0.12);
  backdrop-filter: blur(50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
    cursor: pointer;

    .iconfont {
      margin-right: 11px;
      font-size: 20px;
      color: #000000;
      font-weight: bold;
    }

    .title {
      font-size: 16px;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;

    .profile-photo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      font-size: 16px;
      color: #000000;
      margin-left: 10px;
    }
  }
}
</style>
