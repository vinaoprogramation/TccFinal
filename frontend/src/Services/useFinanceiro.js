import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3001'
  : 'http://192.168.1.11:3001'
  

const useFinanceiro = create((set, get) => ({
    consultaFinanceiro: async () => {

        try {
          const response = await api.get(`${baseUrl}/financeiro/`, {
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

export default useFinanceiro;