import request from '@/utils/request'

// 订单数据列表
export const allOrders = (params) => {
  return request({
    method: 'GET',
    url: 'orders',
    params
  })
}
