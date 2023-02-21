<template>
  <div :id="mapId" ref="satelliteMap" class="satellite-map"></div>
</template>

<script>
/* 卫星图 */
import mapboxgl from 'mapbox-gl'
export default {
  name: 'SatelliteMap',
  components: {},
  props: {
    center: {
      type: Array,
    },
    initMapbox: {
      type: Function,
    },
  },
  data() {
    return {
      mapId: 'satellite-map' + new Date().getTime(), // 地图id(每个地图必须唯一)
    }
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
                'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVhZGluc2lnaHQiLCJhIjoiY2wyc3BianVhMDB4MjNnbGp3dTJmaWo4eiJ9.Z8-xQKW7R7i7j_fZDUa-VQ',
              ],
              tileSize: 256,
            },
          },
          layers: [
            // TODO 开发阶段注释地图服务 防止超流量
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
                'background-color': 'rgba(28, 39, 44,.5)',
              },
            },
          ],
        },
        zoom: 15,
        minZoom: 5,
        maxZoom: 25,
        center: [119.15383, 31.87941],
      })

      mapboxInstance.on('load', () => {
        // 将 mapbox 实例传递到父组件
        this.initMapbox(mapboxInstance)
      })
    },
  },
}
</script>

<style lang="scss" scope>
.satellite-map {
  height: 100% !important;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    z-index: 10;
    pointer-events: none;

    box-shadow: inset 0px 0px 100px 50px rgba(9, 19, 36, 1);
  }

  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
}
</style>
