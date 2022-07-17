import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken() || ''
}
const mutations = {
  setToken (state, token) {
    state.token = token
  },
  removeToken (state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  // 登录
  async login (context, data) {
    try {
      const res = await login(data)
      console.log(res)
      if (res.data.meta.status === 200) {
        context.commit('setToken', res.data.data.token)
        setToken(res.data.data.token)
      } else {
        return Promise.reject(new Error(res.data.meta.msg))
      }
    } catch (error) {
      return Promise.reject(new Error('登陆失败，请重试'))
    }
  },
  // 退出
  logOut (context) {
    context.commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
