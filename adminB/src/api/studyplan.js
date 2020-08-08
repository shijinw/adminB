import axios from '@/libs/api.request'

export const testTimeList = (data) => {
  return axios.request({
    url: '/admin/Studyplan/testTimeList',
    params: data,
    method: 'get'
  })
}
export const planList = (data) => {
  return axios.request({
    url: '/admin/Studyplan/planList',
    params: data,
    method: 'get'
  })
}
export const addPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/addPlan',
    data,
    method: 'post'
  })
}
export const putPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/putPlan',
    data,
    method: 'post'
  })
}
export const delPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/delPlan',
    data,
    method: 'post'
  })
}
export const statusPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/statusPlan',
    params: data,
    method: 'get'
  })
}
export const putTestTime = (data) => {
  return axios.request({
    url: '/admin/Studyplan/putTestTime',
    data,
    method: 'post'
  })
}

export const addTestTime = (data) => {
  return axios.request({
    url: '/admin/Studyplan/addTestTime',
    data,
    method: 'post'
  })
}

export const planExperList = (data) => {
  return axios.request({
    url: '/admin/Studyplan/planExperList',
    params: data,
    method: 'get'
  })
}

export const addExperPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/addExperPlan',
    data,
    method: 'post'
  })
}
export const delVideo = (data) => {
  return axios.request({
    url: '/admin/Studyplan/delVideo',
    data,
    method: 'post'
  })
}
export const statusPlanExper = (data) => {
  return axios.request({
    url: '/admin/Studyplan/statusPlanExper',
    params: data,
    method: 'get'
  })
}
export const putExperPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/putExperPlan',
    data,
    method: 'post'
  })
}

export const delExperPlan = (data) => {
  return axios.request({
    url: '/admin/Studyplan/delExperPlan',
    params: data,
    method: 'get'
  })
}

export const planCouList = (data) => {
  return axios.request({
    url: '/admin/Studyplan/planCouList',
    params: data,
    method: 'get'
  })
}
export const getVideoList = (data) => {
  return axios.request({
    url: '/admin/Studyplan/getVideoList',
    params: data,
    method: 'get'
  })
}

export const addPlanDetail = (data) => {
  return axios.request({
    url: '/admin/Studyplan/addPlanDetail',
    data,
    method: 'post'
  })
}
export const addExperDetil = (data) => {
  return axios.request({
    url: '/admin/Studyplan/addExperDetil',
    data,
    method: 'post'
  })
}
export const planExperCouList = (data) => {
  return axios.request({
    url: '/admin/Studyplan/planExperCouList',
    data,
    method: 'post'
  })
}
export const delExperVideo = (data) => {
  return axios.request({
    url: '/admin/Studyplan/delExperVideo',
    data,
    method: 'post'
  })
}
export const delTestTime = (data) => {
  return axios.request({
    url: '/admin/Studyplan/delTestTime',
    data,
    method: 'post'
  })
}
