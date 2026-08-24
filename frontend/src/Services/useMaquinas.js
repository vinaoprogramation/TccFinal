import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3001/maquinas'
  : 'http://192.168.1.11:3001/maquinas'
//'http://10.0.2.2:3000/usuarios'

const useMaquinas = create((set, get) => ({
  maquinas: [],

  consultaMaquinas: async () => {

    try {
      const response = await api.get(`${baseUrl}/opcoes`);

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.maquinas;

      set({maquinas: answer})


    } catch (error) {
      console.error('Erro ao consultar dashboard:', error);
    }
  },

  

}));

export default useMaquinas;