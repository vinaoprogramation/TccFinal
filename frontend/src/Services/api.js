import axios from 'axios';
import { Platform } from 'react-native';
import { getToken } from './authStorage';

const isWeb = Platform.OS === 'web';

const api = axios.create({
  baseURL: isWeb ? 'https://glorious-space-garbanzo-g47rjx6vx7px2v4r6-3000.app.github.dev/' : 'http://10.0.2.2:3000',
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