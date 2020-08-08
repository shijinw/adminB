import axios from "@/libs/api.request";

export const NewsTypeList = data => {
  return axios.request({
    url: "/admin/News/NewsTypeList",
    params: data,
    method: "get"
  });
};

export const addNewsType = data => {
  return axios.request({
    url: "/admin/News/addNewsType",
    data,
    method: "post"
  });
};
export const putNewsType = data => {
  return axios.request({
    url: "/admin/News/putNewsType",
    data,
    method: "post"
  });
};
export const addTowDocType = data => {
  return axios.request({
    url: "/admin/News/addTowDocType",
    data,
    method: "post"
  });
};
export const putTowDocType = data => {
  return axios.request({
    url: "/admin/News/putTowDocType",
    data,
    method: "post"
  });
};

export const NewsTypeLevel = data => {
  return axios.request({
    url: "/admin/News/NewsTypeLevel",
    params: data,
    method: "get"
  });
};
export const NewsTowTypeList = data => {
  return axios.request({
    url: "/admin/News/NewsTowTypeList",
    params: data,
    method: "get"
  });
};
export const newsList = data => {
  return axios.request({
    url: "/admin/News/newsList",
    params: data,
    method: "get"
  });
};
export const addNews = data => {
  return axios.request({
    url: "/admin/News/addNews",
    data,
    method: "post"
  });
};
export const putNews = data => {
  return axios.request({
    url: "/admin/News/putNews",
    data,
    method: "post"
  });
};
export const getNews = data => {
  return axios.request({
    url: "/admin/News/getNews",
    params: data,
    method: "get"
  });
};
export const hotNews = data => {
  return axios.request({
    url: "/admin/News/hotNews",
    params: data,
    method: "get"
  });
};
export const headNews = data => {
  return axios.request({
    url: "/admin/News/headNews",
    params: data,
    method: "get"
  });
};
export const deleteNews = data => {
  return axios.request({
    url: "/admin/News/deleteNews",
    params: data,
    method: "get"
  });
};
export const stuCenTypeList = data => {
  return axios.request({
    url: "/admin/Gwstucenter/stuCenTypeList",
    params: data,
    method: "get"
  });
};
export const addstuCenType = data => {
  return axios.request({
    url: "/admin/Gwstucenter/addstuCenType",
    params: data,
    method: "post"
  });
};
export const putstuCenType = data => {
  return axios.request({
    url: "/admin/Gwstucenter/putstuCenType",
    data,
    method: "post"
  });
};
export const stuCenList = data => {
  return axios.request({
    url: "/admin/Gwstucenter/stuCenList",
    params: data,
    method: "get"
  });
};

export const addStuCen = data => {
  return axios.request({
    url: "/admin/Gwstucenter/addStuCen",
    data,
    method: "post"
  });
};
export const getStuCen = data => {
  return axios.request({
    url: "/admin/Gwstucenter/getStuCen",
    params: data,
    method: "get"
  });
};
export const putStuCen = data => {
  return axios.request({
    url: "/admin/Gwstucenter/putStuCen",
    data,
    method: "post"
  });
};
export const deleteStuCen = data => {
  return axios.request({
    url: "/admin/Gwstucenter/deleteStuCen",
    params: data,
    method: "get"
  });
};
export const bmList = data => {
  return axios.request({
    url: "/admin/Gwstucenter/bmList",
    params: data,
    method: "get"
  });
};
export const bmExport = data => {
  return axios.request({
    url: "/admin/Gwstucenter/bmExport",
    params: data,
    method: "get"
  });
};
