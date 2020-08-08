import axios from '@/libs/api.request'

export const labelList = (data) => {
  return axios.request({
    url: '/admin/Course/labelList',
    params: data,
    method: 'get'
  })
}

export const addLabel = (data = {}) => {
  return axios.request({
    url: 'admin/Course/addLabel',
    data,
    method: 'post'
  })
}

export const putLabel = (data = {}) => {
  return axios.request({
    url: 'admin/Course/putLabel',
    data,
    method: 'post'
  })
}

export const deleteLabel = (id) => {
  return axios.request({
    url: '/admin/Course/deleteLabel',
    params: {
      id
    },
    method: 'get'
  })
}
export const knowTypeList = (data) => {
  return axios.request({
    url: '/admin/Course/knowTypeList',
    params: data,
    method: 'get'
  })
}
export const addKnowType = (data) => {
  return axios.request({
    url: '/admin/Course/addKnowType',
    data,
    method: 'post'
  })
}
export const putKnowType = (data) => {
  return axios.request({
    url: '/admin/Course/putKnowType',
    data,
    method: 'post'
  })
}
export const deleteKnowType = (data) => {
  return axios.request({
    url: '/admin/Course/deleteKnowType',
    params: data,
    method: 'get'
  })
}
export const docTypeList = (data) => {
  return axios.request({
    url: '/admin/Document/docTypeList',
    params: data,
    method: 'get'
  })
}
export const addType = (data) => {
  return axios.request({
    url: '/admin/Document/addType',
    data,
    method: 'post'
  })
}
export const addDocType = (data) => {
  return axios.request({
    url: '/admin/Document/addDocType',
    data,
    method: 'post'
  })
}
export const towTypeList = (data) => {
  return axios.request({
    url: '/admin/Document/towTypeList',
    params: data,
    method: 'get'
  })
}
export const addDoc = (data) => {
  return axios.request({
    url: '/admin/Document/addDoc',
    data,
    method: 'post'
  })
}
export const getDoc = (data) => {
  return axios.request({
    url: '/admin/Document/getDoc',
    params: data,
    method: 'get'
  })
}
export const putDoc = (data) => {
  return axios.request({
    url: '/admin/Document/putDoc',
    data,
    method: 'post'
  })
}

export const signImgList = (data) => {
  return axios.request({
    url: '/admin/System/signImgList',
    params: data,
    method: 'get'
  })
}

export const addSignImg = (data) => {
  return axios.request({
    url: '/admin/System/addSignImg',
    data,
    method: 'post'
  })
}
export const putSignImg = (data) => {
  return axios.request({
    url: '/admin/System/putSignImg',
    data,
    method: 'post'
  })
}
export const elegantList = (data) => {
  return axios.request({
    url: '/admin/Elegant/elegantList',
    params: data,
    method: 'get'
  })
}
export const addElegant = (data) => {
  return axios.request({
    url: '/admin/Elegant/addElegant',
    data,
    method: 'post'
  })
}
export const putElegant = (data) => {
  return axios.request({
    url: '/admin/Elegant/putElegant',
    data,
    method: 'post'
  })
}
export const deleteElegant = (data) => {
  return axios.request({
    url: '/admin/Elegant/deleteElegant',
    data,
    method: 'post'
  })
}
