import request from '@/utils/request'

// 登录
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: { username, password }
  })
}

// 用户数据列表
export const userList = ({ query, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'users',
    params: {
      query, pagenum, pagesize
    }
  })
}

// 添加用户
export const userAdd = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}
// 修改用户状态
export const userUpdataType = ({ id, type }) => {
  return request({
    method: 'Put',
    url: `users/${id}/state/${type}`
  })
}

// 删除用户
export const userDelete = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

// 根据id查询用户信息
export const userDetails = (id) => {
  return request({
    method: 'Get',
    url: `users/${id}`
  })
}

// 编辑用户提交
export const userPut = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      id, email, mobile
    }
  })
}
