import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3000' 
  : 'http://10.0.2.2:3000';
  //'http://10.0.2.2:3000/usuarios'

const useCatalogo = create((set, get) => ({
    projetos: [],

    consultaCatalogo: async () => {

        try {
          const response = await api.get(`${baseUrl}/catalogo`);
    
          console.log("Status da Resposta:", response.status);
    
    
          const answer = await response.data.resultado;   

          

          set({projetos: answer})
    
        } catch (error) {
          console.error('Erro ao consultar catálogo:', error);
        }
      },
    

}));

export default useCatalogo;