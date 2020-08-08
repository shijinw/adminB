import axios from '@/libs/api.request'

export const studentList = (data) => {
  return axios.request({
    url: '/admin/Student/studentList',
    params: data,
    method: 'get'
  })
}

export const changePassword = (data = {}) => {
  return axios.request({
    url: '/admin/Student/changePassword',
    data,
    method: 'post'
  })
}

export const putRemark = (data = {}) => {
  return axios.request({
    url: '/admin/Student/putRemark',
    data,
    method: 'post'
  })
}

export const exportStudent = (data = {}) => {
  return axios.request({
    url: '/admin/Student/exportStudent',
    data,
    method: 'post'
  })
}

export const giveIntegral = (data = {}) => {
  return axios.request({
    url: '/admin/Student/giveIntegral',
    data,
    method: 'post'
  })
}

export const deleteDev = (id) => {
  return axios.request({
    url: '/admin/Student/deleteDev',
    params: {
      id
    },
    method: 'get'
  })
}

export const studenFinish = (id) => {
  return axios.request({
    url: '/admin/Student/studenFinish',
    params: {
      id
    },
    method: 'get'
  })
}

export const setEmployee = (id) => {
  return axios.request({
    url: '/admin/Student/setEmployee',
    params: {
      id
    },
    method: 'get'
  })
}

export const studenFreeze = (data = {}) => {
  return axios.request({
    url: '/admin/Student/studenFreeze',
    data,
    method: 'post'
  })
}

export const studenUnfreeze = (id) => {
  return axios.request({
    url: '/admin/Student/studenUnfreeze',
    params: {
      id
    },
    method: 'get'
  })
}

export const studyRecords = (data) => {
  return axios.request({
    url: '/admin/Student/studyRecords',
    params: data,
    method: 'get'
  })
}

export const testRecords = (data) => {
  return axios.request({
    url: '/admin/Student/testRecords',
    params: data,
    method: 'get'
  })
}

export const integralRecords = (data) => {
  return axios.request({
    url: '/admin/Student/integralRecords',
    params: data,
    method: 'get'
  })
}

export const openCourseList = (data) => {
  return axios.request({
    url: '/admin/Student/openCourseList',
    params: data,
    method: 'get'
  })
}

export const openCourse = (data = {}) => {
  return axios.request({
    url: '/admin/Student/openCourse',
    data,
    method: 'post'
  })
}

export const closeCourseList = (id) => {
  return axios.request({
    url: '/admin/Student/closeCourseList',
    params: {
      id
    },
    method: 'get'
  })
}

export const closeCourse = (data = {}) => {
  return axios.request({
    url: '/admin/Student/closeCourse',
    data,
    method: 'post'
  })
}

export const openQuestion = (data = {}) => {
  return axios.request({
    url: '/admin/Student/openQuestion',
    data,
    method: 'post'
  })
}

export const userQuestionList = (id) => {
  return axios.request({
    url: '/admin/Student/userQuestionList',
    params: {
      id
    },
    method: 'get'
  })
}

export const closeUserQuestion = (data = {}) => {
  return axios.request({
    url: '/admin/Student/closeUserQuestion',
    data,
    method: 'post'
  })
}

export const userPostpone = (data = {}) => {
  return axios.request({
    url: '/admin/Student/userPostpone',
    data,
    method: 'post'
  })
}

export const deleteStudent = (id) => {
  return axios.request({
    url: '/admin/Student/deleteStudent',
    params: {
      id
    },
    method: 'get'
  })
}

export const receptionList = (data) => {
  return axios.request({
    url: '/admin/Examine/receptionList',
    params: data,
    method: 'get'
  })
}

export const reception = (id) => {
  return axios.request({
    url: '/admin/Examine/reception',
    params: {
      id
    },
    method: 'get'
  })
}

export const stuTeacherList = () => {
  return axios.request({
    url: '/admin/Examine/stuTeacherList',
    method: 'get'
  })
}

export const examineList = (data) => {
  return axios.request({
    url: '/admin/Examine/examineList',
    params: data,
    method: 'get'
  })
}

export const passExamine = (id) => {
  return axios.request({
    url: '/admin/Examine/passExamine',
    params: {
      id
    },
    method: 'get'
  })
}

export const turnExamine = (data = {}) => {
  return axios.request({
    url: '/admin/Examine/turnExamine',
    data,
    method: 'post'
  })
}

export const getStudentDetails = (id) => {
  return axios.request({
    url: '/admin/Examine/getStudentDetails',
    params: {
      id
    },
    method: 'get'
  })
}

export const teaSutList = (data) => {
  return axios.request({
    url: '/admin/Examine/teaSutList',
    params: data,
    method: 'get'
  })
}

export const teacherOpenCourse = (data = {}) => {
  return axios.request({
    url: '/admin/Examine/teacherOpenCourse',
    data,
    method: 'post'
  })
}

export const addPointsUser = (data = {}) => {
  return axios.request({
    url: '/admin/Student/addPointsUser',
    data,
    method: 'post'
  })
}

export const zhengkeList = (data = {}) => {
  return axios.request({
    url: '/admin/Student/zhengkeList',
    params: data,
    method: 'get'
  })
}
export const addUserCpe = (data = {}) => {
  return axios.request({
    url: '/admin/Student/addUserCpe',
    params: data,
    method: 'get'
  })
}
export const addPreviewList = (data = {}) => {
  return axios.request({
    url: '/admin/Student/addPreviewList',
    params: data,
    method: 'get'
  })
}
export const openEduCourseList = (data = {}) => {
  return axios.request({
    url: '/admin/Student/openEduCourseList',
    params: data,
    method: 'get'
  })
}
export const openEduCourse = (data = {}) => {
  return axios.request({
    url: '/admin/Student/openEduCourse',
    data,
    method: 'post'
  })
}
