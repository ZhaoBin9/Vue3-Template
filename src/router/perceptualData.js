/* 感知数据管理 */
const SatelliteData = () => import('@/views/perceptualData/satelliteData/Index') // 卫星数据
const DronesData = () => import('@/views/perceptualData/dronesData/Index') // 无人机数据-基地选择
const DronesDataDetail = () => import('@/views/perceptualData/dronesData/Detail') // 无人机数据-设备
export default [
  {
    path: '/satelliteData',
    name: 'SatelliteData',
    component: SatelliteData,
    meta: {
      title: '卫星数据',
    },
  },
  {
    path: '/dronesData',
    name: 'DronesData',
    component: DronesData,
    meta: {
      title: '无人机数据',
    },
  },
  {
    path: '/dronesData/detail',
    name: 'DronesDataDetail',
    component: DronesDataDetail,
    meta: {
      title: '无人机数据',
    },
  },
]
