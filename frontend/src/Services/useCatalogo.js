import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'https://glorious-space-garbanzo-g47rjx6vx7px2v4r6-3000.app.github.dev'  
  : 'http://10.0.2.2:3000';
  //'http://10.0.2.2:3000/usuarios'

const useCatalogo = create((set, get) => ({
    projetos: [],
    projetoIndividual: null,

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



      consultaProjeto: async (id) => {
        console.log("id: "+id)

        try {
          const response = await api.get(`${baseUrl}/catalogo/${id}`);
    
          console.log("Status da Resposta:", response.status);    
    
          const answer = await response.data.fotos;   

          set({projetoIndividual: answer})
    
        } catch (error) {
          console.error('Erro ao consultar projeto:', error);
        }
      },
    

}));

export default useCatalogo;