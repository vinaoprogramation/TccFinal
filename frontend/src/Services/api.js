import axios from 'axios';
import { Platform } from 'react-native';
import { getToken } from './authStorage';

const isWeb = Platform.OS === 'web';

const api = axios.create({
  baseURL: isWeb ? 'http://192.168.1.11:3001' : 'http://10.0.2.2:3001',
  //'http://10.0.2.2:3000/usuarios'
});
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;