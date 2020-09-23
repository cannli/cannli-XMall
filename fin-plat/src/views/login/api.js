/* eslint-disable func-style */
import axios from '@/assets/js/axios.js';

// 将参数拼接成get请求需要的形式
const handleGetParams = params => {
  const paramsLists = [];
  for (const key in params) {
    paramsLists.push(
      `${key}=${typeof params[key] === 'undefined' ? '' : encodeURIComponent(params[key])}`,
    );
  }
  return paramsLists.join('&');
};

// 审批列表查询
export function sendCode(data) {
  return axios({
    url: `/users/sendCode?${handleGetParams(data)}`,
    method: 'post',
    data,
    unqs: false,
  });
}
