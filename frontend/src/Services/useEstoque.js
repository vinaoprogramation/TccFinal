import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3000/estoque'
  : 'http://10.0.2.2:3000/estoque'
  //'http://10.0.2.2:3000/usuarios'

const useEstoque = create((set, get) => ({
  estoque: [],

    consultaEstoque: async () => {

        try {
          const response = await api.get(`${baseUrl}/opcoes`);
    
          console.log("Status da Resposta:", response.status);
    
          const answer = await response.data.itens;   

          set({estoque: answer})
    
        } catch (error) {
          console.error('Erro ao consultar uruário:', error);
        }
      },
    

}));

export default useEstoque;