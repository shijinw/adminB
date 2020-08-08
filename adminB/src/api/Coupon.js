import axios from "@/libs/api.request";

export const couponList = data => {
  return axios.request({
    url: "/admin/Coupon/couponList",
    params: data,
    method: "get"
  });
};
export const addCoupon = data => {
  return axios.request({
    url: "/admin/Coupon/addCoupon",
    data,
    method: "post"
  });
};
export const getMaxCouponPrice = data => {
  return axios.request({
    url: "/admin/Coupon/getMaxCouponPrice",
    params: data,
    method: "get"
  });
};
export const putCoupon = data => {
  return axios.request({
    url: "/admin/Coupon/putCoupon",
    data,
    method: "post"
  });
};
export const deleteCoupon = data => {
  return axios.request({
    url: "/admin/Coupon/deleteCoupon",
    params: data,
    method: "get"
  });
};
export const sendUserCoupon = data => {
  return axios.request({
    url: "/admin/Coupon/sendUserCoupon",
    data,
    method: "post"
  });
};
export const cardList = data => {
  return axios.request({
    url: "/admin/Coursecard/cardList",
    params: data,
    method: "get"
  });
};
export const cardDetailList = data => {
  return axios.request({
    url: "/admin/Coursecard/cardDetailList",
    params: data,
    method: "get"
  });
};
export const addCard = data => {
  return axios.request({
    url: "/admin/Coursecard/addCard",
    data,
    method: "post"
  });
};
export const delCard = data => {
  return axios.request({
    url: "/admin/Coursecard/delCard",
    params: data,
    method: "get"
  });
};
export const delCardDetail = data => {
  return axios.request({
    url: "/admin/Coursecard/delCardDetail",
    params: data,
    method: "get"
  });
};
export const exportCard = data => {
  return axios.request({
    url: "/admin/Coursecard/exportCard",
    params: data,
    method: "get"
  });
};
export const cardDetection = data => {
  return axios.request({
    url: "/admin/Coursecard/cardDetection",
    params: data,
    method: "get"
  });
};
export const cardBooksList = data => {
  return axios.request({
    url: "/admin/Coursecard/cardBooksList",
    params: data,
    method: "get"
  });
};
export const jdPackageList = data => {
  return axios.request({
    url: "/admin/Coupon/jdPackageList",
    params: data,
    method: "get"
  });
};
export const putJdPcakagePrice = data => {
  return axios.request({
    url: "/admin/Coupon/putJdPcakagePrice",
    params: data,
    method: "get"
  });
};
