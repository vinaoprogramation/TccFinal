import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const baseUrl = 'https://reni-3d-app.onrender.com/maquinas'

const useMaquinas = create((set, get) => ({
  maquinas: [],

  consultaMaquinas: async () => {

    try {
      const response = await api.get(`${baseUrl}/opcoes`);

      const answer = await response.data.maquinas;

      set({maquinas: answer})


    } catch (error) {
      console.error('Erro ao consultar máquinas:', error);
    }
  },

  

}));

export default useMaquinas;