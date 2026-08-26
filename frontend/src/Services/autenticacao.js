import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3000/autenticacao'
  : 'http://10.0.2.2:3000/autenticacao'
  //'http://10.0.2.2:3000/usuarios'

const autenticacao = create((set, get) => ({
  autenticado: false,
  usuario: null,
  foto: null,
  mode: false,

  login: async (email, senha) => {

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      console.log("Status da Resposta:", response.status);


      console.log(response)
      

      const answer = await response.json();

      
      await storeToken(answer.token);
      
      if (answer.token) {

        set({ autenticado: true });

        get().consultarUsuario();

      if(answer.role == 'admin'){
          set({mode: true})
        } else{
          set({mode: false})
        }
      }      

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  },





  consultarUsuario: async () => {

    try {
      const response = await api.get(`${baseUrl}/consultar/eu`);

      console.log("Status da Resposta:", response.status);


      const answer = await response.data;

      console.log("Está aqui" + answer)


      if (answer) {

        set({ usuario: answer.response.usuario, foto: answer.fotoPerfil});

      }      

    } catch (error) {
      console.error('Erro ao consultar usuário:', error);
    }
  },



  logout: async() => {
    await removeToken();

    set({autenticado: false})
  }


}));

export default autenticacao;