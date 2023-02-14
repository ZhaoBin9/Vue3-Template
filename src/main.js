import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores'
import router from '@/router'
import './styles/style.scss'

// 注册全局 vue-echarts 组件
import ECharts from 'vue-echarts'
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, LegendComponent } from 'echarts/components'

use([SVGRenderer, RadarChart, TitleComponent, LegendComponent])

const app = createApp(App)
app.component('VChart', ECharts)
app.use(pinia)
app.use(router)

app.mount('#app')
