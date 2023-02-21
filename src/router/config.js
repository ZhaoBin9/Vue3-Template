export const menuList = [
  {
    title: 'Pinia',
    iconName: 'yonghuguanli',
    path: '/pinia',
    key: '0',
  },
  {
    title: 'VEcharts',
    iconName: 'yonghuguanli',
    path: '/v-echarts',
    key: '1',
  },
  {
    title: 'MapExample',
    iconName: 'yonghuguanli',
    path: '/map-example',
    key: '3',
  },
  {
    title: '感知数据管理',
    iconName: 'shujuguanli',
    key: '2',
    children: [
      {
        title: '卫星数据',
        path: '/satelliteData',
        key: '2-0',
      },
      // 页面含子页面详情页
      {
        title: '无人机数据',
        path: ['/dronesData', '/dronesData/detail'],
        key: '2-1',
      },
    ],
  },
  {
    title: '用户管理',
    iconName: 'yonghuguanli',
    path: '/userManage',
    key: '8',
  },
]

// 扁平化 navMenu 配置
export const flattening = (menuList) => {
  return menuList.reduce((pre, cur) => {
    if (cur.children) pre.push(...cur.children)
    else pre.push(cur)
    return pre
  }, [])
}
