import axios from 'axios';

const API_URL = 'https://take-home-test-api.nutech-integrasi.com';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const token = JSON.parse(savedUser).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const loginAPI = async (email: string, password: string) => {
  const res = await api.post('/login', { email, password });
  return res.data;
};

export const registerAPI = async (
  email: string,
  first_name: string,
  last_name: string,
  password: string
) => {
  const res = await api.post('/registration', { email, first_name, last_name, password });
  return res.data;
};

export const getProfileAPI = async () => {
  const res = await api.get('/profile');
  return res.data;
};
