import axios from 'axios'

import store from '@/store'
import { getToken } from './auth'

import router from '@/router'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    const time = Date.now() - getToken()
    if (time > 1000) {
      store.dispatch('user/logOut')
      router.push('/login')
    }
    config.headers['Authorization'] = 'Bearer ' + token
    config.headers.Authorization = `${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
