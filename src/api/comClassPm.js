import request from '@/utils/request'

// 分类参数列表
export const parameterList = ({ id, sel }) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

// 删除参数
export const removeparameterList = ({ id, attrid }) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}

// 添加分类
export const addParameter = (data) => {
  return request({
    method: 'POST',
    url: `categories/${data.id}/attributes`,
    data
  })
}

// 编辑提交参数
export const editParameter = (data) => {
  return request({
    method: 'PUT',
    url: `categories/${data.id}/attributes/${data.attrId}`,
    data
  })
}
