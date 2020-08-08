import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}
export const getFeedback = (data) => {
  return axios.request({
    url: '/admin/Information/getFeedback',
    params: data,
    method: 'get'
  })
}
export const dataAskList = (data) => {
  return axios.request({
    url: '/admin/Information/dataAskList',
    params: data,
    method: 'get'
  })
}
export const upIdear = (data) => {
  return axios.request({
    url: '/admin/Information/upIdear',
    params: data,
    method: 'get'
  })
}
