import axios from 'axios';

const API_BASE_URL = 'http://loaclhost//9999'; // 替换为实际的 API 基础 URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 请求超时时间，根据需要进行调整
});

export const userLogin = (formData) => {
  return api.post('/project02user/loginuser', formData);
};

export const userLogout = (token) => {
  return api.post('/project02user/logoutuser', null, {
    headers: { 'X-Token': token },
  });
};

export const userSelectAll = () => {
  return api.get('/project02user/adds');
};
