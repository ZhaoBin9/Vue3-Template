<template>
  <div :id="mapId" class="satellite-map" ref="satelliteMap"></div>
</template>

<script>
/* 卫星图 */
import mapboxgl from 'mapbox-gl'
export default {
  name: 'SatelliteMap',
  components: {},
  data() {
    return {
      mapId: 'satellite-map' + new Date().getTime(), // 地图id(每个地图实例保持唯一)
    }
  },
  props: {
    initMapbox: {
      type: Function,
    },
    // 地图缩放级别
    zoom: {
      type: Number,
      required: true,
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
  mounted() {
    this.initMap()
  },
  methods: {
    // 地图初始化
    initMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoibGVhZGluc2lnaHQiLCJhIjoiY2wyc3BianVhMDB4MjNnbGp3dTJmaWo4eiJ9.Z8-xQKW7R7i7j_fZDUa-VQ'
      let mapboxInstance = new mapboxgl.Map({
        container: this.mapId,
        style: {
          version: 8,
          glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
          sources: {
            'satelite-tiles': {
              type: 'raster',
              tiles: [
                // 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVhZGluc2lnaHQiLCJhIjoiY2wyc3BianVhMDB4MjNnbGp3dTJmaWo4eiJ9.Z8-xQKW7R7i7j_fZDUa-VQ',
                'https://api.mapbox.com/v4/mapbox.satellite/16/{x}/{y}.jpg90?access_token=pk.eyJ1IjoibGVhZGluc2lnaHQiLCJhIjoiY2wyc3BianVhMDB4MjNnbGp3dTJmaWo4eiJ9.Z8-xQKW7R7i7j_fZDUa-VQ', // 临时替换，缓解 Static Tiles API 请求压力
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: 'satelite',
              type: 'raster',
              source: 'satelite-tiles',
              minzoom: 0,
              maxzoom: 22,
            },
            {
              id: 'deep-bg',
              type: 'background', // 背景图层
              paint: {
                'background-color': '#ffffff',
              },
            },
          ],
        },
        zoom: this.zoom,
        pitch: this.pitch || 0,
        minZoom: 4,
        maxZoom: 22,
        center: this.center.length ? this.center : [119.35357, 30.17],
      })

      mapboxInstance.on('load', () => {
        // 将 mapbox 实例传递到父组件
        this.initMapbox(mapboxInstance)
      })
    },
  },
}
</script>

<style>
.satellite-map {
  height: 100%;
  width: 100%;
}

.mapboxgl-ctrl-logo.mapboxgl-ctrl-logo {
  display: none;
}
</style>
