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

        try {
          const response = await api.get(`${baseUrl}/catalogo/${id}`);
    
          console.log("Status da Resposta:", response.status);

          console.log("Resposta: "+response.data.fotos.foto)
    
    
          const answer = await response.data.fotos.foto;   

          console.log(answer)

          

          set({projetoIndividual: answer})
    
        } catch (error) {
          console.error('Erro ao consultar projeto:', error);
        }
      },
    

}));

export default useCatalogo;