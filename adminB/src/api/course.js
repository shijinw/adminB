import axios from '@/libs/api.request'

export const projectList = (data) => {
  return axios.request({
    url: '/admin/Course/projectList',
    params: data,
    method: 'get'
  })
}

export const projectMove = (data) => {
  return axios.request({
    url: '/admin/Course/projectMove',
    params: data,
    method: 'get'
  })
}

export const deleteProject = (data) => {
  return axios.request({
    url: '/admin/Course/deleteProject',
    params: data,
    method: 'get'
  })
}

export const statusSection = (data) => {
  return axios.request({
    url: '/admin/Course/statusSection',
    params: data,
    method: 'get'
  })
}

export const addProject = (data = {}) => {
  return axios.request({
    url: '/admin/Course/addProject',
    data,
    method: 'post'
  })
}

export const putProject = (data = {}) => {
  return axios.request({
    url: '/admin/Course/putProject',
    data,
    method: 'post'
  })
}

export const majorList = (data) => {
  return axios.request({
    url: '/admin/Course/majorList',
    params: data,
    method: 'get'
  })
}

export const majorMove = (data) => {
  return axios.request({
    url: '/admin/Course/majorMove',
    params: data,
    method: 'get'
  })
}

export const addMajor = (data = {}) => {
  return axios.request({
    url: '/admin/Course/addMajor',
    data,
    method: 'post'
  })
}

export const putMajor = (data = {}) => {
  return axios.request({
    url: '/admin/Course/putMajor',
    data,
    method: 'post'
  })
}

export const deleteMajor = (data) => {
  return axios.request({
    url: '/admin/Course/deleteMajor',
    params: data,
    method: 'get'
  })
}

export const orgList = () => {
  return axios.request({
    url: '/admin/Course/orgList',
    method: 'get'
  })
}

export const addOrg = (data = {}) => {
  return axios.request({
    url: '/admin/Course/addOrg',
    data,
    method: 'post'
  })
}

export const putOrg = (data = {}) => {
  return axios.request({
    url: '/admin/Course/putOrg',
    data,
    method: 'post'
  })
}

export const deleteOrg = (data) => {
  return axios.request({
    url: '/admin/Course/deleteOrg',
    params: data,
    method: 'get'
  })
}

export const getProjectMajor = () => {
  return axios.request({
    url: '/admin/Linkmenu/proMjor2tree',
    method: 'get'
  })
}

export const knowList = (data) => {
  return axios.request({
    url: '/admin/Course/knowList',
    params: data,
    method: 'get'
  })
}

export const addKnow = (data = {}) => {
  return axios.request({
    url: '/admin/Course/addKnow',
    data,
    method: 'post'
  })
}

export const putKnow = (data = {}) => {
  return axios.request({
    url: '/admin/Course/putKnow',
    data,
    method: 'post'
  })
}

export const deleteKnow = (data) => {
  return axios.request({
    url: '/admin/Course/deleteKnow',
    params: data,
    method: 'get'
  })
}

export const videoList = (data) => {
  return axios.request({
    url: '/admin/Course/videoList',
    params: data,
    method: 'get'
  })
}

export const getKnow = (data) => {
  return axios.request({
    url: '/admin/Course/getKnow',
    params: data,
    method: 'get'
  })
}

export const addVideo = (data) => {
  return axios.request({
    url: '/admin/Course/addVideo',
    data,
    method: 'post'
  })
}

export const videoTime = (data) => {
  return axios.request({
    url: '/admin/Course/videoTime',
    params: data,
    method: 'get'
  })
}

export const putVideo = (data) => {
  return axios.request({
    url: '/admin/Course/putVideo',
    data,
    method: 'post'
  })
}

export const deleteVideo = (data) => {
  return axios.request({
    url: '/admin/Course/deleteVideo',
    params: data,
    method: 'get'
  })
}

export const auditDetaile = (data) => {
  return axios.request({
    url: '/admin/Course/auditDetaile',
    params: data,
    method: 'get'
  })
}
export const addHandouts = (data) => {
  return axios.request({
    url: '/admin/Course/addHandouts',
    data,
    method: 'post'
  })
}

export const knowNoList = (data) => {
  return axios.request({
    url: '/admin/Course/knowNoList',
    params: data,
    method: 'get'
  })
}

export const knowVideoList = (data) => {
  return axios.request({
    url: '/admin/Course/knowVideoList',
    params: data,
    method: 'get'
  })
}

export const addKnowVideo = (data) => {
  return axios.request({
    url: '/admin/Course/addKnowVideo',
    data,
    method: 'post'
  })
}

export const courseList = (data) => {
  return axios.request({
    url: '/admin/Course/courseList',
    params: data,
    method: 'get'
  })
}
export const courseNoList = (data) => {
  return axios.request({
    url: '/admin/Course/courseNoList',
    params: data,
    method: 'get'
  })
}

export const packageContent = (data) => {
  return axios.request({
    url: '/admin/Course/packageContent',
    params: data,
    method: 'get'
  })
}
export const addCourse = (data) => {
  return axios.request({
    url: '/admin/Course/addCourse',
    data,
    method: 'post'
  })
}

export const putCourse = (data) => {
  return axios.request({
    url: '/admin/Course/putCourse',
    data,
    method: 'post'
  })
}

export const getCourse = (data) => {
  return axios.request({
    url: '/admin/Course/getCourse',
    params: data,
    method: 'get'
  })
}

export const deleteCourse = (data) => {
  return axios.request({
    url: '/admin/Course/deleteCourse',
    params: data,
    method: 'get'
  })
}

export const getSection = (data) => {
  return axios.request({
    url: '/admin/Course/getSection',
    params: data,
    method: 'get'
  })
}

export const addKnowSection = (data) => {
  return axios.request({
    url: '/admin/Course/addKnowSection',
    data,
    method: 'post'
  })
}
export const putKnowSection = (data) => {
  return axios.request({
    url: '/admin/Course/putKnowSection',
    data,
    method: 'post'
  })
}

export const putSection = (data) => {
  return axios.request({
    url: '/admin/Course/putSection',
    data,
    method: 'post'
  })
}

export const deleteSection = (data) => {
  return axios.request({
    url: '/admin/Course/deleteSection',
    params: data,
    method: 'get'
  })
}

export const sectionMove = (data) => {
  return axios.request({
    url: '/admin/Course/sectionMove',
    params: data,
    method: 'get'
  })
}
export const knowSectionList = (data) => {
  return axios.request({
    url: '/admin/Course/knowSectionList',
    params: data,
    method: 'get'
  })
}

export const SecNoViList = (data) => {
  return axios.request({
    url: '/admin/Course/SecNoViList',
    params: data,
    method: 'get'
  })
}

export const sectionVideoList = (data) => {
  return axios.request({
    url: '/admin/Course/sectionVideoList',
    params: data,
    method: 'get'
  })
}

export const addSectionVideo = (data) => {
  return axios.request({
    url: '/admin/Course/addSectionVideo',
    params: data,
    method: 'get'
  })
}
export const addSection = (data) => {
  return axios.request({
    url: '/admin/Course/addSection',
    data,
    method: 'post'
  })
}

export const sectionVideoMove = (data) => {
  return axios.request({
    url: '/admin/Course/sectionVideoMove',
    params: data,
    method: 'get'
  })
}

export const sectionPaper = (data) => {
  return axios.request({
    url: '/admin/Course/sectionPaper',
    data,
    method: 'post'
  })
}

export const paperList = (data) => {
  return axios.request({
    url: '/admin/Course/paperList',
    params: data,
    method: 'get'
  })
}

export const auditPackage = (data) => {
  return axios.request({
    url: '/admin/Course/auditPackage',
    params: data,
    method: 'get'
  })
}
export const statusPackage = (data) => {
  return axios.request({
    url: '/admin/Course/statusPackage',
    params: data,
    method: 'get'
  })
}
export const statusCourse = (data) => {
  return axios.request({
    url: '/admin/Course/statusCourse',
    params: data,
    method: 'get'
  })
}
export const packageList = (data) => {
  return axios.request({
    url: '/admin/Course/packageList',
    params: data,
    method: 'get'
  })
}
export const addPackage = (data) => {
  return axios.request({
    url: '/admin/Course/addPackage',
    data,
    method: 'post'
  })
}
export const packageContentMove = (data) => {
  return axios.request({
    url: '/admin/Course/packageContentMove',
    params: data,
    method: 'get'
  })
}
export const packageContentList = (data) => {
  return axios.request({
    url: '/admin/Course/packageContentList',
    params: data,
    method: 'get'
  })
}
export const putPackage = (data) => {
  return axios.request({
    url: '/admin/Course/putPackage',
    data,
    method: 'post'
  })
}
export const getPackage = (data) => {
  return axios.request({
    url: '/admin/Course/getPackage',
    params: data,
    method: 'get'
  })
}
export const deletePackage = (data) => {
  return axios.request({
    url: '/admin/Course/deletePackage',
    params: data,
    method: 'get'
  })
}

export const knowTypeLevel = (data) => {
  return axios.request({
    url: '/admin/Course/knowTypeLevel',
    params: data,
    method: 'get'
  })
}

export const knowThreeLevel = (data) => {
  return axios.request({
    url: '/admin/Question/knowThreeLevel',
    params: data,
    method: 'get'
  })
}

export const knobTwoLevel = (data) => {
  return axios.request({
    url: '/admin/Course/knobTwoLevel',
    params: data,
    method: 'get'
  })
}

export const addKnob = (data) => {
  return axios.request({
    url: '/admin/Course/addKnob',
    data,
    method: 'post'
  })
}

export const putKnob = (data) => {
  return axios.request({
    url: '/admin/Course/putKnob',
    data,
    method: 'post'
  })
}

export const knobKnowList = (data) => {
  return axios.request({
    url: '/admin/Course/knobKnowList',
    params: data,
    method: 'get'
  })
}

export const delKnowSection = (data) => {
  return axios.request({
    url: '/admin/Course/delKnowSection',
    params: data,
    method: 'get'
  })
}
export const delKnob = (data) => {
  return axios.request({
    url: '/admin/Course/delKnob',
    params: data,
    method: 'get'
  })
}
export const secKnobList = (data) => {
  return axios.request({
    url: '/admin/Course/secKnobList',
    params: data,
    method: 'get'
  })
}

export const majorCourseList = (data) => {
  return axios.request({
    url: '/admin/Course/majorCourseList',
    params: data,
    method: 'get'
  })
}

export const knobList = (data) => {
  return axios.request({
    url: '/admin/Course/knobList',
    params: data,
    method: 'get'
  })
}
export const knobMove = (data) => {
  return axios.request({
    url: '/admin/Course/knobMove',
    params: data,
    method: 'get'
  })
}

export const knobSectionMove = (data) => {
  return axios.request({
    url: '/admin/Course/knobSectionMove',
    params: data,
    method: 'get'
  })
}
export const sectionHandouts = (data) => {
  return axios.request({
    url: '/admin/Course/sectionHandouts',
    data,
    method: 'post'
  })
}
export const getQueList = (data) => {
  return axios.request({
    url: '/admin/Course/getQueList',
    params: data,
    method: 'get'
  })
}
