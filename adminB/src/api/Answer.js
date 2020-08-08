import axios from "@/libs/api.request";

export const couAnswerList = data => {
  return axios.request({
    url: "/admin/Answer/couAnswerList",
    params: data,
    method: "get"
  });
};

export const userPageRuleList = data => {
  return axios.request({
    url: "/admin/Auth/userPageRuleList",
    params: data,
    method: "get"
  });
};
export const couAnswerInfo = data => {
  return axios.request({
    url: "/admin/Answer/couAnswerInfo",
    params: data,
    method: "get"
  });
};
export const lookCouAnswer = data => {
  return axios.request({
    url: "/admin/Answer/lookCouAnswer",
    params: data,
    method: "get"
  });
};
export const lookQueAnswer = data => {
  return axios.request({
    url: "/admin/Answer/lookQueAnswer",
    params: data,
    method: "get"
  });
};
export const couReplyAnswer = data => {
  return axios.request({
    url: "/admin/Answer/couReplyAnswer",
    data,
    method: "post"
  });
};
export const couAnswerExport = data => {
  return axios.request({
    url: "/admin/Answer/couAnswerExport",
    params: data,
    method: "get"
  });
};
export const queAnswerList = data => {
  return axios.request({
    url: "/admin/Answer/queAnswerList",
    params: data,
    method: "get"
  });
};
export const queAnswerExport = data => {
  return axios.request({
    url: "/admin/Answer/queAnswerExport",
    params: data,
    method: "get"
  });
};
export const queAnswerInfo = data => {
  return axios.request({
    url: "/admin/Answer/queAnswerInfo",
    params: data,
    method: "get"
  });
};
export const queReplyAnswer = data => {
  return axios.request({
    url: "/admin/Answer/queReplyAnswer",
    data,
    method: "post"
  });
};
export const courseDayCount = data => {
  return axios.request({
    url: "/admin/Answer/courseDayCount",
    params: data,
    method: "get"
  });
};
export const getAnswerUser = data => {
  return axios.request({
    url: "/admin/Answer/getAnswerUser",
    params: data,
    method: "get"
  });
};
export const courseMonthCount = data => {
  return axios.request({
    url: "/admin/Answer/courseMonthCount",
    params: data,
    method: "get"
  });
};
export const questionMonthCount = data => {
  return axios.request({
    url: "/admin/Answer/questionMonthCount",
    params: data,
    method: "get"
  });
};
export const questionDayCount = data => {
  return axios.request({
    url: "/admin/Answer/questionDayCount",
    params: data,
    method: "get"
  });
};
export const delCouAnswer = data => {
  return axios.request({
    url: "/admin/Answer/delCouAnswer",
    data,
    method: "post"
  });
};
export const putCouReplyAnswer = data => {
  return axios.request({
    url: "/admin/Answer/putCouReplyAnswer",
    data,
    method: "post"
  });
};
export const putQueReplyAnswer = data => {
  return axios.request({
    url: "/admin/Answer/putQueReplyAnswer",
    data,
    method: "post"
  });
};

export const delQueAnswer = data => {
  return axios.request({
    url: "/admin/Answer/delQueAnswer",
    data,
    method: "post"
  });
};
export const closeTimeList = data => {
  return axios.request({
    url: "/admin/Answer/closeTimeList",
    params: data,
    method: "get"
  });
};
export const addCloseTime = data => {
  return axios.request({
    url: "/admin/Answer/addCloseTime",
    data,
    method: "post"
  });
};

export const putCloseTime = data => {
  return axios.request({
    url: "/admin/Answer/putCloseTime",
    data,
    method: "post"
  });
};
export const statusCloseTime = data => {
  return axios.request({
    url: "/admin/Answer/statusCloseTime",
    params: data,
    method: "get"
  });
};
export const shiftTimeList = data => {
  return axios.request({
    url: "/admin/Answer/shiftTimeList",
    params: data,
    method: "get"
  });
};
export const addShiftTime = data => {
  return axios.request({
    url: "/admin/Answer/addShiftTime",
    data,
    method: "post"
  });
};

export const putShiftTime = data => {
  return axios.request({
    url: "/admin/Answer/putShiftTime",
    data,
    method: "post"
  });
};
export const statusShiftTime = data => {
  return axios.request({
    url: "/admin/Answer/statusShiftTime",
    params: data,
    method: "get"
  });
};
export const complainList = data => {
  return axios.request({
    url: "/admin/Answer/complainList",
    params: data,
    method: "get"
  });
};
export const complainDetails = data => {
  return axios.request({
    url: "/admin/Answer/complainDetails",
    params: data,
    method: "get"
  });
};
export const complainTypeList = data => {
  return axios.request({
    url: "/admin/Answer/complainTypeList",
    params: data,
    method: "get"
  });
};
export const allAnswerPond = data => {
  return axios.request({
    url: "/admin/Answer/allAnswerPond",
    params: data,
    method: "get"
  });
};
export const answerPond = data => {
  return axios.request({
    url: "/admin/Answer/answerPond",
    params: data,
    method: "get"
  });
};
export const couAnswerListA = data => {
  return axios.request({
    url: "/admin/Answer/couAnswerListA",
    params: data,
    method: "get"
  });
};
export const couAnswerListB = data => {
  return axios.request({
    url: "/admin/Answer/couAnswerListB",
    params: data,
    method: "get"
  });
};
export const queAnswerListA = data => {
  return axios.request({
    url: "/admin/Answer/queAnswerListA",
    params: data,
    method: "get"
  });
};
export const queAnswerListB = data => {
  return axios.request({
    url: "/admin/Answer/queAnswerListB",
    params: data,
    method: "get"
  });
};
export const affirmComplain = data => {
  return axios.request({
    url: "/admin/Answer/affirmComplain",
    params: data,
    method: "get"
  });
};
export const imgRecord = data => {
  return axios.request({
    url: "/admin/Answer/imgRecord",
    params: data,
    method: "get"
  });
};
export const teacherComplain = data => {
  return axios.request({
    url: "/admin/Answer/teacherComplain",
    params: data,
    method: "get"
  });
};
export const answerVideoList = data => {
  return axios.request({
    url: "/admin/Answer/answerVideoList",
    params: data,
    method: "get"
  });
};
export const questionList = data => {
  return axios.request({
    url: "/admin/Answer/questionList",
    params: data,
    method: "get"
  });
};
export const putAnswerJhZd = data => {
  return axios.request({
    url: "/admin/Answer/putAnswerJhZd",
    params: data,
    method: "get"
  });
};
export const answerQueList = data => {
  return axios.request({
    url: "/admin/Answer/answerQueList",
    params: data,
    method: "get"
  });
};
