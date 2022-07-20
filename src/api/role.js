import request from '@/utils/request'

// 角色列表
export const rolesList = () => {
  return request({
    method: 'GET',
    url: 'roles'
  })
}
// 分配用户角色
export const userRolesList = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: { rid }
  })
}

// 添加角色
export const addRole = (data) => {
  return request({
    method: 'POST',
    url: 'roles',
    data
  })
}

// 根据 ID 查询角色
export const queryRole = (id) => {
  return request({
    method: 'GET',
    url: `roles/${id}`
  })
}

// 编辑提交角色
export const editRole = ({ id, roleName, roleDesc }) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      roleName, roleDesc
    }
  })
}

// 删除角色
export const removeRole = (id) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}
