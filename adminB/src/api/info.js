import axios from '@/libs/api.request'

/*
 *inc_type类型 点击不同栏目，传递不同参数即可：
 *alipay（支付宝）、WeChat(微信) 、ccvideo(cc视频) 、
 *sendSms(短信) 、 statistics（统计代码）、coupon(优惠券限额) 、 purchase(内购)
 */
export const systemList = (inc_type) => {
  return axios.request({
    url: '/admin/System/systemList',
    params: {
      inc_type
    },
    method: 'get'
  })
}

export const putSystem = (data = {}) => {
  return axios.request({
    url: 'admin/System/putSystem',
    data,
    method: 'post'
  })
}

export const putLabel = (data = {}) => {
  return axios.request({
    url: 'admin/System/putLabel',
    data,
    method: 'post'
  })
}

export const deleteLabel = (id) => {
  return axios.request({
    url: '/admin/System/deleteLabel',
    params: {
      id
    },
    method: 'get'
  })
}

export const smsList = (data) => {
  return axios.request({
    url: '/admin/System/smsList',
    params: data,
    method: 'get'
  })
}

export const massSms = (data = {}) => {
  return axios.request({
    url: 'admin/System/massSms',
    data,
    method: 'post'
  })
}

export const getOnline = (id) => {
  return axios.request({
    url: '/admin/System/getOnline',
    params: {
      id
    },
    method: 'get'
  })
}

export const putOnline = (data = {}) => {
  return axios.request({
    url: 'admin/System/putOnline',
    data,
    method: 'post'
  })
}
export const apkList = (data = {}) => {
  return axios.request({
    url: 'admin/System/apkList',
    params: data,
    method: 'get'
  })
}
export const putApk = (data = {}) => {
  return axios.request({
    url: 'admin/System/putApk',
    data,
    method: 'post'
  })
}
export const advertList = (data = {}) => {
  return axios.request({
    url: 'admin/System/advertList',
    params: data,
    method: 'get'
  })
}
export const positionList = (data = {}) => {
  return axios.request({
    url: 'admin/System/positionList',
    params: data,
    method: 'get'
  })
}
export const addAdvert = (data = {}) => {
  return axios.request({
    url: 'admin/System/addAdvert',
    data,
    method: 'post'
  })
}
export const putAdvert = (data = {}) => {
  return axios.request({
    url: 'admin/System/putAdvert',
    data,
    method: 'post'
  })
}
export const getAdvert = (data = {}) => {
  return axios.request({
    url: 'admin/System/getAdvert',
    params: data,
    method: 'get'
  })
}
export const deleteAdvert = (data = {}) => {
  return axios.request({
    url: 'admin/System/deleteAdvert',
    params: data,
    method: 'get'
  })
}
export const isStatus = (data = {}) => {
  return axios.request({
    url: 'admin/System/isStatus',
    params: data,
    method: 'get'
  })
}
export const sysMessageList = (data) => {
  return axios.request({
    url: 'admin/System/sysMessageList',
    params: data,
    method: 'get'
  })
}
export const addSysMessage = (data) => {
  return axios.request({
    url: 'admin/System/addSysMessage',
    data,
    method: 'post'
  })
}
export const messageDetails = (data) => {
  return axios.request({
    url: 'admin/System/messageDetails',
    params: data,
    method: 'get'
  })
}
export const integralTypeList = (data) => {
  return axios.request({
    url: 'admin/Integral/integralTypeList',
    params: data,
    method: 'get'
  })
}
export const addIntegralType = (data) => {
  return axios.request({
    url: 'admin/Integral/addIntegralType',
    data,
    method: 'post'
  })
}
export const putIntegralType = (data) => {
  return axios.request({
    url: 'admin/Integral/putIntegralType',
    data,
    method: 'post'
  })
}
export const addGoods = (data) => {
  return axios.request({
    url: 'admin/Integral/addGoods',
    data,
    method: 'post'
  })
}
export const putGoods = (data) => {
  return axios.request({
    url: 'admin/Integral/putGoods',
    data,
    method: 'post'
  })
}
export const goodsList = (data) => {
  return axios.request({
    url: 'admin/Integral/goodsList',
    params: data,
    method: 'get'
  })
}
export const delGoods = (data) => {
  return axios.request({
    url: 'admin/Integral/delGoods',
    params: data,
    method: 'get'
  })
}
export const goodsDetails = (data) => {
  return axios.request({
    url: 'admin/Integral/goodsDetails',
    params: data,
    method: 'get'
  })
}
export const integralDeliver = (data) => {
  return axios.request({
    url: 'admin/Integral/integralDeliver',
    params: data,
    method: 'get'
  })
}
