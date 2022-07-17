import axios from 'axios'

import store from '@/store'
// import { getTime } from '@/utils/auth'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL:'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    // const time = Date.now() - getTime()
    // 2 * 60 * 60 * 1000 = 7200000
    // if (time > 7200000) {
    //   store.dispatch('user/logout')
    //   router.push('/login')
    // }
    // config.headers['Authorization'] = 'Bearer ' + token
    config.headers.Authorization = `${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
