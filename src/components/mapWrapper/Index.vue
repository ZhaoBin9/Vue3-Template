<template>
  <div class="map-wrapper">
    <!-- 卫星图 -->
    <SatelliteMap :initMapbox="initMapbox" :pitch="pitch" :zoom="zoom" :center="center" />
    <slot></slot>
  </div>
</template>

<script>
import SatelliteMap from './SatelliteMap'
export default {
  name: 'MapWrapper',
  components: {
    SatelliteMap,
  },
  props: {
    initMapbox: {
      type: Function,
    },
    // 地图缩放级别
    zoom: {
      type: Number,
      default: 9.5,
    },
    pitch: {
      type: Number,
      default: 0,
    },
    center: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
