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
