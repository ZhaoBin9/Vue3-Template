import store from '@/store'
/*
 * 清除 mapbox 地图实例，避免不断加载地图瓦片
 * Note: 默认最多尝试 10 次清除操作
 */
export default function clearMapInstance(instance) {
  let timeCount = 0
  const intervalId = setInterval(() => {
    let mapInstance = instance || store.state.mapboxInstance
    timeCount++
    if (timeCount >= 10) {
      clearInterval(intervalId)
    } else if (mapInstance && mapInstance.remove) {
      console.log('------------mapbox instance is cleared!')
      mapInstance.remove()
      clearInterval(intervalId)
    }
  }, 3000)
}
