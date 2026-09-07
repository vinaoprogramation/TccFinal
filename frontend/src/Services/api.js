import axios from 'axios';
import { Platform } from 'react-native';
import { getToken } from './authStorage';

const isWeb = Platform.OS === 'web';

const api = axios.create({
  baseURL: isWeb
    ? 'http://localhost:3000'
    : 'http://192.168.1.11:3000',
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    console.log('API REQUEST:');
    console.log('Base URL:', config.baseURL);
    console.log('URL:', config.url);
    console.log('Method:', config.method);
    console.log('Token:', token ? 'Presente' : 'Ausente');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log('API REQUEST ERROR:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API RESPONSE:');
    console.log('Status:', response.status);
    console.log('URL:', response.config?.url);
    console.log('Data:', response.data);

    return response;
  },
  (error) => {
    console.log('API RESPONSE ERROR:');
    console.log('Message:', error.message);
    console.log('Code:', error.code);
    console.log('URL:', error.config?.url);
    console.log('Base URL:', error.config?.baseURL);
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
    console.log('Headers:', error.response?.headers);

    return Promise.reject(error);
  }
);

export default api;