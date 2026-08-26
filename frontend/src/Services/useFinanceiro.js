import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3000/financeiro'
  : 'http://192.168.1.11:3000/financeiro'


const useFinanceiro = create((set, get) => ({
  pendentes: [],
  totalArrecadado: null,
  totalPorMes: [],
  totalPorAluno: [],
  totalPorCategoria: [],

  consultaFinanceiro: async () => {

    try {
      const response = await api.get(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Status da Resposta:", response.status);


      const answer = await response.data;

    } catch (error) {
      console.error('Erro ao consultar uruário:', error);
    }
  },


  consultaPendentes: async () => {

    try {
      const response = await api.get(`${baseUrl}/pendentes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.pendentes;

      set({pendentes: answer})

    } catch (error) {
      console.error('Erro ao consultar uruário:', error);
    }
  },




  consultaDashboard: async () => {

    try {
      const response = await api.get(`${baseUrl}/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.dashboard;

      set({totalArrecadado: answer.total_arrecadado, totalPorMes: answer.total_por_mes, totalPorAluno: answer.total_por_aluno, totalPorCategoria: answer.total_por_categoria});

    } catch (error) {
      console.error('Erro ao consultar uruário:', error);
    }
  },


}));

export default useFinanceiro;