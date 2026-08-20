import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'https://glorious-space-garbanzo-g47rjx6vx7px2v4r6-3000.app.github.dev/autenticacao' 
  : 'http://192.168.1.11:3000';
  //'http://10.0.2.2:3000/usuarios'

const useEstoque = create((set, get) => ({
    consultaEstoque: async () => {

        try {
          const response = await api.get(`${baseUrl}/estoque/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          console.log("Status da Resposta:", response.status);
    
    
          const answer = await response.data;   
    
        } catch (error) {
          console.error('Erro ao consultar uruário:', error);
        }
      },
    

}));

export default useEstoque;