<template>
  <div class="no-data">
    <img src="../assets/images/common/no_data.png" alt="无数据" width="217px" />
    <p>{{ tipsText }}</p>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    // 提示文案
    tipsText: {
      type: String,
      default: '暂无数据',
    },
  },
}
</script>

<style lang="scss" scoped>
.no-data {
  width: 100%;
  text-align: center;

  p {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #aaaaaa;
    line-height: 22px;
    margin-top: 15px;
    text-align: center;
  }
}
</style>
