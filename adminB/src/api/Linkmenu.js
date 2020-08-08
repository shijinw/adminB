import axios from '@/libs/api.request'

export const proMjor2tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/proMjor2tree',
    params: data,
    method: 'get'
  })
}
export const knob2Tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/knob2Tree',
    params: data,
    method: 'get'
  })
}
export const knobKnow3Tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/knobKnow3Tree',
    params: data,
    method: 'get'
  })
}
export const proMjorCou3tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/proMjorCou3tree',
    params: data,
    method: 'get'
  })
}
export const zkProMjorCou3tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/zkProMjorCou3tree',
    params: data,
    method: 'get'
  })
}
export const eduCorSec2tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/eduCorSec2tree',
    params: data,
    method: 'get'
  })
}
export const couSec2Tree = (data) => {
  return axios.request({
    url: '/admin/Linkmenu/couSec2Tree',
    params: data,
    method: 'get'
  })
}
