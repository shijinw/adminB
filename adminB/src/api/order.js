import axios from '@/libs/api.request'
export const ordersList = (data) => {
  return axios.request({
    url: '/admin/Orders/ordersList',
    params: data,
    method: 'get'
  })
}
export const ordersExport = (data) => {
  return axios.request({
    url: '/admin/Orders/ordersExport',
    params: data,
    method: 'get'
  })
}
export const ordersDetails = (data) => {
  return axios.request({
    url: '/admin/Orders/ordersDetails',
    params: data,
    method: 'get'
  })
}

export const ordersRunning = (data) => {
  return axios.request({
    url: '/admin/Orders/ordersRunning',
    params: data,
    method: 'get'
  })
}

export const runningExport = (data) => {
  return axios.request({
    url: '/admin/Orders/runningExport',
    params: data,
    method: 'get'
  })
}

export const runningDetails = (data) => {
  return axios.request({
    url: '/admin/Orders/runningDetails',
    params: data,
    method: 'get'
  })
}

export const voucherList = (data) => {
  return axios.request({
    url: '/admin/Orders/voucherList',
    params: data,
    method: 'get'
  })
}

export const voucherDetails = (data) => {
  return axios.request({
    url: '/admin/Orders/voucherDetails',
    params: data,
    method: 'get'
  })
}
export const upExpriTime = (data) => {
  return axios.request({
    url: '/admin/Orders/upExpriTime',
    params: data,
    method: 'get'
  })
}
