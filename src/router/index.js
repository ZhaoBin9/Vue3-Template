import { createRouter, createWebHistory } from 'vue-router'
import Pinia from '@/views/pinia/Index.vue'
import VEcharts from '@/views/vEcharts/Index.vue'
import BaseLayout from '@/layout/BaseLayout.vue'

import perceptualData from './perceptualData' // 感知数据管理版块路由
import jurisdiction from './jurisdiction' // 权限管理
import userManage from './userManage' // 用户管理

const routes = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/pinia',
    children: [
      {
        title: 'Pinia',
        path: '/pinia',
        component: Pinia,
      },
      {
        title: 'VEcharts',
        path: '/v-echarts',
        component: VEcharts,
      },
      ...perceptualData,
      ...jurisdiction,
      ...userManage,
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
