import axios from '@/libs/api.request'

export const userRuleList = (user_id) => {
  return axios.request({
    url: '/admin/Auth/userRuleList',
    params: {
      user_id
    },
    method: 'get'
  })
}

export const addMenuRule = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/addMenuRule',
    data,
    method: 'post'
  })
}

export const putMenuRule = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/putMenuRule',
    data,
    method: 'post'
  })
}

export const deleteMenuRule = (id) => {
  return axios.request({
    url: '/admin/Auth/deleteMenuRule',
    params: {
      id
    },
    method: 'get'
  })
}

export const addPageRule = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/addPageRule',
    data,
    method: 'post'
  })
}

export const putPageRule = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/putPageRule',
    data,
    method: 'post'
  })
}

export const deletePageRule = (id) => {
  return axios.request({
    url: '/admin/Auth/deletePageRule',
    params: {
      id
    },
    method: 'get'
  })
}

export const groupList = () => {
  return axios.request({
    url: '/admin/Auth/groupList',
    method: 'get'
  })
}

export const addGroup = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/addGroup',
    data,
    method: 'post'
  })
}

export const putGroup = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/putGroup',
    data,
    method: 'post'
  })
}

export const deleteGroup = (id) => {
  return axios.request({
    url: '/admin/Auth/deleteGroup',
    params: {
      id
    },
    method: 'get'
  })
}

export const addGroupRule = (data = {}) => {
  return axios.request({
    url: '/admin/Auth/addGroupRule',
    data,
    method: 'post'
  })
}

export const userList = (data) => {
  return axios.request({
    url: '/admin/User/userList',
    params: data,
    method: 'get'
  })
}

export const addUser = (data = {}) => {
  return axios.request({
    url: '/admin/User/addUser',
    data,
    method: 'post'
  })
}

export const putUser = (data = {}) => {
  return axios.request({
    url: '/admin/User/putUser',
    data,
    method: 'post'
  })
}

export const deleteUser = (user_id) => {
  return axios.request({
    url: '/admin/User/deleteUser',
    params: {
      user_id
    },
    method: 'get'
  })
}

export const frozenUser = (data = {}) => {
  return axios.request({
    url: '/admin/User/frozenUser',
    data,
    method: 'post'
  })
}

// 获取首页信息。。。
export const homeData = () => {
  return axios.request({
    url: '/admin/Index/showInfo',
    method: 'get'
  })
}

export const userPageRuleList = (menu_name) => {
  return axios.request({
    url: '/admin/Auth/userPageRuleList',
    params: {
      menu_name
    },
    method: 'get'
  })
}

export const changePassword = (data = {}) => {
  return axios.request({
    url: '/admin/User/changePassword',
    data,
    method: 'post'
  })
}

export const userLog = (data) => {
  return axios.request({
    url: '/admin/User/userLog',
    params: data,
    method: 'get'
  })
}

export const answerTimeList = () => {
  return axios.request({
    url: '/admin/System/answerTimeList',
    method: 'get'
  })
}

export const putAnswerTime = (data = {}) => {
  return axios.request({
    url: '/admin/System/putAnswerTime',
    data,
    method: 'post'
  })
}

export const hotSearchList = (data) => {
  return axios.request({
    url: '/admin/System/hotSearchList',
    params: data,
    method: 'get'
  })
}

export const courseRecommendList = (data) => {
  return axios.request({
    url: '/admin/System/courseRecommendList',
    params: data,
    method: 'get'
  })
}

export const addCourseRecommend = (data = {}) => {
  return axios.request({
    url: '/admin/System/addCourseRecommend',
    data,
    method: 'post'
  })
}

export const putCourseRecommend = (data = {}) => {
  return axios.request({
    url: '/admin/System/putCourseRecommend',
    data,
    method: 'post'
  })
}

export const delCourseRecommend = (id) => {
  return axios.request({
    url: '/admin/System/delCourseRecommend',
    params: {
      id
    },
    method: 'get'
  })
}

export const poscommendonList = () => {
  return axios.request({
    url: '/admin/System/poscommendonList',
    method: 'get'
  })
}

export const coursePackageList = () => {
  return axios.request({
    url: '/admin/System/coursePackageList',
    method: 'get'
  })
}

/**
 * 上传图片
 * @return {[type]} [description]
 * f 图片对象
 * name 后端返回的name
 * success 长传成功的函数
 * error 长传失败的函数
 */
export const upLoadImage = (f, name, success, error) => {
  const url = '/upload/Index/uploadImage'
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  const formData = new FormData()
  formData.append('image', f)
  formData.append('name', name)
  xhr.send(formData)
  xhr.onreadystatechange = function (response) {
    if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '') {
      const blkRet = JSON.parse(xhr.responseText)
      success(blkRet)
    } else if (xhr.status != 200 && xhr.responseText) {
      error(xhr.status)
    }
  }
}
