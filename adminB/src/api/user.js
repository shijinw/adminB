import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password
  }
  return axios.request({
    url: '/admin/login/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/admin/login/getUserInfo',

    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: '/admin/login/logout',
    method: 'post'
  })
}
export const getUserSysMenu = () => {
  return axios.request({
    url: '/admin/Auth/userMenuRuleList',
    method: 'get'
  })
}
export const userInfo = (data) => {
  return axios.request({
    url: '/admin/User/userInfo',
    params: data,
    method: 'get'
  })
}
