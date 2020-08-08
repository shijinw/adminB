import axios from '@/libs/api.request'

export const BooksList = (data) => {
  return axios.request({
    url: '/admin/Books/BooksList',
    params: data,
    method: 'get'
  })
}

export const addBooks = (data) => {
  return axios.request({
    url: '/admin/Books/addBooks',
    data,
    method: 'post'
  })
}

export const putBooks = (data) => {
  return axios.request({
    url: '/admin/Books/putBooks',
    data,
    method: 'post'
  })
}

export const statusBooks = (data) => {
  return axios.request({
    url: '/admin/Books/statusBooks',
    params: data,
    method: 'get'
  })
}

export const BooksDetalis = (data) => {
  return axios.request({
    url: '/admin/Books/BooksDetalis',
    params: data,
    method: 'get'
  })
}
