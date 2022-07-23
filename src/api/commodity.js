import request from '@/utils/request'

// 商品列表数据
export const getCommodity = (params) => {
  return request({
    method: 'GET',
    url: 'goods',
    params
  })
}

// 根据Id查询商品
export const getIdCommodity = (id) => {
  return request({
    method: 'GET',
    url: `goods/${id}`
  })
}

// 添加商品
export const addCommodity = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}

// 删除商品
export const removeCommodity = (id) => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}

// 编辑提交商品
export const editCommodity = (id, data) => {
  return request({
    method: 'PUT',
    url: `goods/${id}`,
    data
  })
}

// 商品分类数据列表
export const getCommodityClass = () => {
  return request({
    method: 'GET',
    url: 'categories'
  })
}

// 删除商品分类
export const removeCommodityClass = (id) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}`
  })
}

// 添加商品分类
export const addCommodityClass = ({ cat_pid, cat_name, cat_level }) => {
  return request({
    method: 'POST',
    url: 'categories',
    data: {
      cat_pid, cat_name, cat_level
    }
  })
}

// 根据 id 查询分类
export const getIdCommodityClass = (id) => {
  return request({
    method: 'GET',
    url: `categories/${id}`
  })
}

// 编辑提交分类
export const editCommodityClass = (id, data) => {
  return request({
    method: 'PUT',
    url: `categories/${id}`,
    data
  })
}
