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
