import axios from 'axios'
import Cookies from 'js-cookie'
import { baseUrl } from './env'
import router from '../router'
import store from '../store'

const localToken = 'BD1E239F1B4B061A4821E4FA99AA512A'

const instance = axios.create({
  baseURL: `${baseUrl}/linanAI/back/v1/`,
  timeout: 20000, // 设置20s超时
})

// 设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    // get/delete/head/options请求通过query形式(params) 传参，post/put/patch请求通过request body形式(data)传参
    const method = config.method
    let type = 'data'
    if (method === 'get' || method === 'delete' || method === 'head' || method === 'options') {
      type = 'params'
    } else {
      config[type] = config[type] && config[type]['params']
    }
    if (!config[type]) {
      config[type] = {}
    }
    // 设置token
    config.headers = {
      Authorization: Cookies.get('web_linan_ai_analysis_management_platform_token') || localToken,
    }

    return config
  },
  () => {
    return Promise.reject({
      message: '当前网络不佳，请稍后再试-1',
    })
  }
)

// 设置响应拦截器
instance.interceptors.response.use(
  (res) => {
    const { status, data, message, code } = res.data || {}
    if (!status) {
      return Promise.reject({
        data: res.data,
        message: message || '当前网络不佳，请稍后再试-2',
      })
    } else if (code !== 200) {
      return Promise.reject({
        data: res.data,
        message: message || '当前网络不佳，请稍后再试-3',
      })
    }

    return data
  },
  (err) => {
    // 处理接口请求超时
    if (err.message === 'timeout of 20000ms exceeded') {
      console.log('接口请求失败: 超过20秒无响应')
      return Promise.reject({
        message: err.message,
      })
    }

    if (
      err.response &&
      err.response.data &&
      err.response.data.code === 400 &&
      err.response.data.message === '用户不存在'
    ) {
      console.log('用户不存在')
      store.commit('SET_LOGIN_STATUS', false)
      Cookies.remove('web_linan_ai_analysis_management_platform_token')
      router.push({
        path: '/jurisdiction',
      })
    }

    if (err.response && err.response.status === 401) {
      // 没有权限时跳转登录页面
      store.commit('SET_LOGIN_STATUS', false)
      Cookies.remove('web_linan_ai_analysis_management_platform_token')
      console.log('登录信息失效，请重新登录')
      router.push({
        path: '/jurisdiction',
      })
    }

    console.log('res-err: ', err.response)
    console.log(err.response.data.message || '当前网络不佳，请稍后再试-4')
    return Promise.reject(err.response.data)
  }
)

export default instance
