import request from '@/utils/request'

// 所有权限列表
export const allRights = (type) => {
  return request({
    method: 'GET',
    url: `rights/${type}`
  })
}

// 删除角色指定权限
export const removeRoleJurisdiction = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
// 给角色授权
export const addRoleJurisdiction = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
