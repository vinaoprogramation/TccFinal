import { create } from 'zustand';
import {
  storeToken,
  getToken,
  removeToken
} from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const baseUrl = 'https://reni-3d-app.onrender.com/usuarios'

const useUsuarios = create((set, get) => ({

  alteraUsuario: async (nome, curso) => {
    console.log(nome, curso)

    try {
      const response = await api.put(`${baseUrl}/perfil`, {
          "nome": nome,
          "curso": curso
        }
      );

      console.log("Status da Resposta:", response.status);


      const answer = await response;

      if(answer){
        return true;
      }

    } catch (error) {
      console.error('Erro ao consultar catálogo:', error);
    }
  },

}));

export default useUsuarios


export {
  baseUrl
};