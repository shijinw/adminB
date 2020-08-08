import axios from '@/libs/api.request'

export const teacherList = (data) => {
  return axios.request({
    url: '/admin/Teacher/teacherList',
    params: data,
    method: 'get'
  })
}

export const teacherTitleList = () => {
  return axios.request({
    url: '/admin/Teacher/teacherTitleList',
    method: 'get'
  })
}

export const deleteTeacher = (id) => {
  return axios.request({
    url: '/admin/Teacher/deleteTeacher',
    params: {
      id
    },
    method: 'get'
  })
}

export const addTeacher = (data = {}) => {
  return axios.request({
    url: 'admin/Teacher/addTeacher',
    data,
    method: 'post'
  })
}

export const getTeacher = (id) => {
  return axios.request({
    url: '/admin/Teacher/getTeacher',
    params: {
      id
    },
    method: 'get'
  })
}

export const putTeacher = (data = {}) => {
  return axios.request({
    url: 'admin/Teacher/putTeacher',
    data,
    method: 'post'
  })
}

export const addTeacherTitle = (data = {}) => {
  return axios.request({
    url: 'admin/Teacher/addTeacherTitle',
    data,
    method: 'post'
  })
}

export const putTeacherTitle = (data = {}) => {
  return axios.request({
    url: 'admin/Teacher/putTeacherTitle',
    data,
    method: 'post'
  })
}

export const deleteTeacherTitle = (id) => {
  return axios.request({
    url: '/admin/Teacher/deleteTeacherTitle',
    params: {
      id
    },
    method: 'get'
  })
}

export const teacherMove = (data) => {
  return axios.request({
    url: '/admin/Teacher/teacherMove',
    params: data,
    method: 'get'
  })
}
