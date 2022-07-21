import request from '@/utils/request'

// 订单数据列表
export const allOrders = (params) => {
  return request({
    method: 'GET',
    url: 'orders',
    params
  })
}

// 查看订单详情
export const getOrdersId = ({ id }) => {
  return request({
    method: 'GET',
    url: `orders/${id}`
  })
}
