// 添加临安图层
export default function addLinanLayer(map, fontColor = '#333', borderColor = 'rgb(121, 183, 170)') {
  return new Promise(async (resolve, reject) => {
    try {
      // 添加镇边界图层
      await map.addLayer({
        id: 'linan_area_boundary-layer',
        source: 'region',
        'source-layer': 'region',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': borderColor,
          'line-width': 2,
        },
      })

      // 添加临安边界
      await map.addLayer({
        id: 'linan_boundary-layer',
        source: 'region_linan',
        'source-layer': 'region_linan',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': borderColor,
          'line-width': 2,
        },
      })

      // 添加镇街道名称图层
      await map.addLayer({
        id: `linan_name-layer`,
        source: 'region_center',
        'source-layer': 'region_center',
        type: 'symbol',
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 14,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': fontColor,
        },
      })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
