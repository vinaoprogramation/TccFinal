import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3001'
  : 'http://10.0.2.2:3001'
//'http://10.0.2.2:3000/usuarios'

const useAprovacao = create((set, get) => ({
  aprovacoes: [],

  consultaAprovacoes: async () => {

    try {
      const response = await api.get(`${baseUrl}/aprovacoes/pendentes`);

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.aprovacoes;

      set({aprovacoes: answer})


    } catch (error) {
      console.error('Erro ao consultar dashboard:', error);
    }
  },


  decideAprovacao: async (id, status, observacao) => {

    try {
      const response = await api.patch(`${baseUrl}/aprovacoes/${id}`,{
          "status": status,
          "observacao": observacao,
        
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }


    } catch (error) {
      console.error('Erro ao DECIDIR:', error);
    }
  },

  

}));

export default useAprovacao;