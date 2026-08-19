import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3000/autencicacao' 
  : 'http://192.168.1.11:3000/autencicacao';
  //'http://10.0.2.2:3000/usuarios'

const useCatalogo = create((set, get) => ({
  projetos: [],



  registrar: async (username, password) => {

    try {
      const response = await fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      const answer = await response.json();

      await storeToken(answer.token);

      if (answer.token) {
        set({ autenticado: true, user: { username: answer.username } });
      }
      

    } catch (error) {
      console.error('Erro ao fazer registro e login:', error);
    }
  },

  logout: async() => {
    await removeToken();

    set({autenticado: false})
  }


}));

export default useCatalogo;