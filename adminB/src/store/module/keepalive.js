export default {
  state: {
    question: {
      page: 1,
      limit: 10,
      project_id: '',
      major_id: '',
      know_id: '',
      question_type: '',
      status: '',
      id: '',
      question_stem: ''
    },
    course: {
      page: 1,
      limit: 10,
      project_id: '',
      major_id: '',
      class_id: '',
      name: '',
      id: '',
      status: ''
    },
    students: {
      mobile: '',
      username: '',
      status: '',
      id: '',
      page: 1,
      limit: 10
    },
    knowlibs: {
      page: 1,
      limit: 10,
      project_id: '',
      major_id: '',
      type_id: '',
      know_name: ''
    },
    video: {
      page: 1,
      limit: 10,
      project_id: '',
      major_id: '',
      class_id: '',
      video_name: ''
    }
  },
  getters: {
  },
  mutations: {
    // 题库列表缓存
    setquestion (state, from) {
      state.question.page = from.page
      state.question.limit = from.limit
      state.question.project_id = from.project_id
      state.question.major_id = from.major_id
      state.question.know_id = from.know_id
      state.question.question_type = from.question_type
      state.question.status = from.status
      state.question.id = from.id
      state.question.question_stem = from.question_stem
    },
    // 课程包缓存
    setcourse (state, from) {
      state.course.page = from.page
      state.course.limit = from.limit
      state.course.project_id = from.project_id
      state.course.major_id = from.major_id
      state.course.class_id = from.class_id
      state.course.name = from.name
      state.course.status = from.status
      state.course.id = from.id
    },
    // 学员缓存
    setstudent (state, from) {
      state.students.page = from.page
      state.students.limit = from.limit
      state.students.mobile = from.mobile
      state.students.username = from.username
      state.students.status = from.status
      state.students.id = from.id
    },
    // 知识点缓存
    setknowlibs (state, from) {
      state.knowlibs.page = from.page
      state.knowlibs.limit = from.limit
      state.knowlibs.project_id = from.project_id
      state.knowlibs.major_id = from.major_id
      state.knowlibs.type_id = from.type_id
      state.knowlibs.know_name = from.know_name
    },
    // 视频表缓存
    setvideo (state, from) {
      state.video.page = from.page
      state.video.limit = from.limit
      state.video.project_id = from.project_id
      state.video.major_id = from.major_id
      state.video.class_id = from.class_id
      state.video.video_name = from.video_name
    }
  }

}
