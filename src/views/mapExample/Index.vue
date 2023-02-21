<template>
  <section class="map">
    <MapWrapper :init-mapbox="initMapBox"></MapWrapper>
  </section>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import MapWrapper from '@/components/mapWrapper/Index'
import img1 from '@/assets/images/digitalBase/icon-pollute.png'
import img2 from '@/assets/images/digitalBase/icon-pollute.png'
import img3 from '@/assets/images/digitalBase/icon-warm.png'
import img4 from '@/assets/images/digitalBase/icon-video.png'
import colorList from './colorList'

const state = reactive({
  mapInstance: null,
  name1: '111',
})

const loadImageIcon = (map) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageList = [
        {
          url: img1,
          usedName: 'base_location_icon',
        },
        {
          url: img2,
          usedName: 'base_icon_pollute',
        },
        {
          url: img3,
          usedName: 'base_icon_warm',
        },
        {
          url: img4,
          usedName: 'base_icon_video',
        },
      ]
      for (const item of imageList) {
        await new Promise((resolve, reject) => {
          map.loadImage(item.url, function (error, image) {
            if (error) {
              reject()
            }
            map.addImage(item.usedName, image)
            resolve()
          })
        })
      }
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const loadGeoMapSource = (map) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sourceList = [
        't_agriculturalbase', // 农场多边形区域（面）
        't_agriculturalbase_part', // 功能区（面）
        't_base_part_point', // 功能区（点）
      ]
      for (const name of sourceList) {
        await map.addSource(name, {
          type: 'vector',
          scheme: 'tms',
          tiles: [
            `${'http://47.99.119.240:1304'}/geoserver/gwc/service/tms/1.0.0/yunhe%3A${name}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
          ],
        })
      }
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const addSpotsAreaLayer = (map) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 数字基地图层--面
      let baseFilloptions = {
        id: `t_agriculturalbase-layers`,
        source: `t_agriculturalbase`,
        'source-layer': `t_agriculturalbase`,
        type: 'fill',
        // 过滤展示当前用户的农场
        filter: ['match', ['get', 'fid'], 170, true, false],
        paint: {
          'fill-color': 'rgba(132, 224, 235, 0)',
        },
      }
      await map.addLayer(baseFilloptions)

      // 数字基地图层--线
      let baseLineoptions = {
        id: `t_agriculturalbase-line-layers`,
        source: `t_agriculturalbase`,
        'source-layer': `t_agriculturalbase`,
        type: 'line',
        // 过滤展示当前用户的农场
        filter: ['match', ['get', 'fid'], 170, true, false],
        paint: {
          'line-color': 'rgba(11, 191, 164, 1)',
          'line-width': 2,
        },
      }
      await map.addLayer(baseLineoptions)

      // // 数字基地--点
      // let basePonitOptions = {
      //   id: `base_point-layer`,
      //   source: `base_point`,
      //   'source-layer': `base_point`,
      //   type: 'symbol',
      //   layout: {
      //     'icon-image': 'base_location_icon',
      //     'icon-size': 0.5,
      //     'text-field': `{name}`,
      //     'text-offset': [0, -2.5],
      //     'text-size': 20,
      //     'icon-allow-overlap': false,
      //   },
      //   paint: {
      //     'text-color': '#fff',
      //   },
      // }
      // await map.addLayer(basePonitOptions)

      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const addRibbonAreaLayer = (map) => {
  return new Promise(async (resolve, reject) => {
    try {
      let areaColor = []
      colorList.forEach((it, index) => {
        areaColor.push(index + '')
        areaColor.push(it.colorBg)
      })
      areaColor.push('red')
      // 功能区多边形区域图层（面）
      let areaOptions = {
        id: `t_agriculturalbase_part-layer`,
        source: `t_agriculturalbase_part`,
        'source-layer': `t_agriculturalbase_part`,
        type: 'fill',
        // 过滤展示当前用户的农场
        filter: ['match', ['get', 'base_id'], 170, true, false],
        paint: {
          'fill-color': ['match', ['get', 'color'], ...areaColor],
        },
      }
      await map.addLayer(areaOptions)

      // 农场多边形边界图层（线）
      let areaLineColor = []
      colorList.forEach((it, index) => {
        areaLineColor.push(index + '')
        areaLineColor.push(it.color)
      })
      areaLineColor.push('red')
      let lineOption = {
        id: `t_agriculturalbase_part-line-layer`,
        source: `t_agriculturalbase_part`,
        'source-layer': `t_agriculturalbase_part`,
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        // 过滤展示当前用户的农场
        filter: ['match', ['get', 'base_id'], 170, true, false],
        paint: {
          'line-color': ['match', ['get', 'color'], ...areaColor],
          'line-width': 1,
        },
      }
      await map.addLayer(lineOption)

      await map.addLayer({
        id: `t_base_part_point-layer`,
        source: 't_base_part_point',
        'source-layer': 't_base_part_point',
        type: 'symbol',
        // filter: true,
        // 过滤展示当前用户的农场
        filter: ['match', ['get', 'base_id'], 170, true, false],
        layout: {
          'text-field': `{base_part_name}`,
          'text-size': 13,
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#fff',
          // 'text-halo-color': 'rgba(6, 38, 91, .9)',
          // 'text-halo-width': 2,
          // 'text-halo-blur': 2,
        },
      })
      // this.bindEventToLayer(this.mapboxInstance)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const showSpotsLayers = async (map) => {
  return new Promise(async (resolve) => {
    await loadImageIcon(map)
    await loadGeoMapSource(map)
    await addSpotsAreaLayer(map)
    await addRibbonAreaLayer(map)
    resolve()
  })
}

const initMapBox = async (map) => {
  state.mapInstance = map

  await showSpotsLayers(map)
  // map.jumpTo({
  //   center: [119.15383, 31.87941],
  //   zoom: 16,
  //   // pitch: 70,
  // })
  console.log('init')
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 600px;
  overflow: hidden;
}
</style>
