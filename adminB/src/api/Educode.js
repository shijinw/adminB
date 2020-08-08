import axios from '@/libs/api.request'
export const previewList = (data) => {
  return axios.request({
    url: '/admin/Edu/previewList',
    params: data,
    method: 'get'
  })
}
export const putPreview = (data) => {
  return axios.request({
    url: '/admin/Edu/putPreview',
    data,
    method: 'post'
  })
}
export const addPreview = (data) => {
  return axios.request({
    url: '/admin/Edu/addPreview',
    data,
    method: 'post'
  })
}
export const statusPreview = (data) => {
  return axios.request({
    url: '/admin/Edu/statusPreview',
    params: data,
    method: 'get'
  })
}
export const eduTypeList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduTypeList',
    params: data,
    method: 'get'
  })
}
export const addEduType = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduType',
    data,
    method: 'post'
  })
}
export const putEduType = (data) => {
  return axios.request({
    url: '/admin/Edu/putEduType',
    data,
    method: 'post'
  })
}
export const delEduType = (data) => {
  return axios.request({
    url: '/admin/Edu/delEduType',
    params: data,
    method: 'get'
  })
}
export const eduPackageList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduPackageList',
    params: data,
    method: 'get'
  })
}
export const statusEduPackage = (data) => {
  return axios.request({
    url: '/admin/Edu/statusEduPackage',
    params: data,
    method: 'get'
  })
}
export const addEduPackage = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduPackage',
    data,
    method: 'post'
  })
}
export const putEduPackage = (data) => {
  return axios.request({
    url: '/admin/Edu/putEduPackage',
    data,
    method: 'post'
  })
}
export const getEduPackage = (data) => {
  return axios.request({
    url: '/admin/Edu/getEduPackage',
    params: data,
    method: 'get'
  })
}
export const eduContentList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduContentList',
    params: data,
    method: 'get'
  })
}
export const courseNoList = (data) => {
  return axios.request({
    url: '/admin/Edu/courseNoList',
    params: data,
    method: 'get'
  })
}
export const eduPackageContent = (data) => {
  return axios.request({
    url: '/admin/Edu/eduPackageContent',
    params: data,
    method: 'get'
  })
}
export const EduContentMove = (data) => {
  return axios.request({
    url: '/admin/Edu/EduContentMove',
    params: data,
    method: 'get'
  })
}
export const delEduPackage = (data) => {
  return axios.request({
    url: '/admin/Edu/delEduPackage',
    params: data,
    method: 'get'
  })
}
export const eduPackageMove = (data) => {
  return axios.request({
    url: '/admin/Edu/eduPackageMove',
    params: data,
    method: 'get'
  })
}
export const eduCourseList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduCourseList',
    params: data,
    method: 'get'
  })
}
export const statusEduCourse = (data) => {
  return axios.request({
    url: '/admin/Edu/statusEduCourse',
    params: data,
    method: 'get'
  })
}
export const delEduCourse = (data) => {
  return axios.request({
    url: '/admin/Edu/delEduCourse',
    params: data,
    method: 'get'
  })
}
export const addEduCourse = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduCourse',
    data,
    method: 'post'
  })
}
export const getEduCourse = (data) => {
  return axios.request({
    url: '/admin/Edu/getEduCourse',
    params: data,
    method: 'get'
  })
}
export const putEduCourse = (data) => {
  return axios.request({
    url: '/admin/Edu/putEduCourse',
    data,
    method: 'post'
  })
}
export const eduCourseMove = (data) => {
  return axios.request({
    url: '/admin/Edu/eduCourseMove',
    params: data,
    method: 'get'
  })
}
export const getEduSection = (data) => {
  return axios.request({
    url: '/admin/Edu/getEduSection',
    params: data,
    method: 'get'
  })
}
export const addEduSection = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduSection',
    data,
    method: 'post'
  })
}
export const putEduSection = (data) => {
  return axios.request({
    url: '/admin/Edu/putEduSection',
    data,
    method: 'post'
  })
}
export const eduSecNoViList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduSecNoViList',
    params: data,
    method: 'get'
  })
}
export const eduSecVideoList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduSecVideoList',
    params: data,
    method: 'get'
  })
}
export const addEduSectionVideo = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduSectionVideo',
    data,
    method: 'post'
  })
}
export const eduSectionVideoMove = (data) => {
  return axios.request({
    url: '/admin/Edu/eduSectionVideoMove',
    params: data,
    method: 'get'
  })
}
export const eduVideoList = (data) => {
  return axios.request({
    url: '/admin/Edu/eduVideoList',
    params: data,
    method: 'get'
  })
}
export const videoTime = (data) => {
  return axios.request({
    url: '/admin/Edu/videoTime',
    params: data,
    method: 'get'
  })
}
export const addEduHandouts = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduHandouts',
    data,
    method: 'post'
  })
}
export const getPreview = (data) => {
  return axios.request({
    url: '/admin/Edu/getPreview',
    params: data,
    method: 'get'
  })
}
export const previewUserList = (data) => {
  return axios.request({
    url: '/admin/Edu/previewUserList',
    params: data,
    method: 'get'
  })
}
export const statusPreviewUser = (data) => {
  return axios.request({
    url: '/admin/Edu/statusPreviewUser',
    params: data,
    method: 'get'
  })
}
export const eduSectionMove = (data) => {
  return axios.request({
    url: '/admin/Edu/eduSectionMove',
    params: data,
    method: 'get'
  })
}
export const EduSecHandouts = (data) => {
  return axios.request({
    url: '/admin/Edu/EduSecHandouts',
    data,
    method: 'post'
  })
}
export const statusEduSection = (data) => {
  return axios.request({
    url: '/admin/Edu/statusEduSection',
    params: data,
    method: 'get'
  })
}
export const delEduSection = (data) => {
  return axios.request({
    url: '/admin/Edu/delEduSection',
    params: data,
    method: 'get'
  })
}
export const addEduVideo = (data) => {
  return axios.request({
    url: '/admin/Edu/addEduVideo',
    data,
    method: 'post'
  })
}
export const putEduVideo = (data) => {
  return axios.request({
    url: '/admin/Edu/putEduVideo',
    data,
    method: 'post'
  })
}
export const delEduVideo = (data) => {
  return axios.request({
    url: '/admin/Edu/delEduVideo',
    params: data,
    method: 'get'
  })
}
