import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3001'
  : 'http://192.168.1.11:3001'
//'http://10.0.2.2:3000/usuarios'

const useDashboard = create((set, get) => ({
  atualizado: null,
  indicadores: null,
  impressoesPorCategoria: [],
  consumoPorMaterial: [],
  horasPorMaquina: [],
  arrecadacaoPorMes: [],

  consultaDashboard: async () => {

    try {
      const response = await api.get(`${baseUrl}/dashboard/admin`);

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.dashboard;

      console.log("Arrecadacao: "+answer.graficos.arrecadacao_por_mes[0].total)

      set({ indicadores: answer.indicadores,
        impressoesPorCategoria: answer.graficos.impressoes_por_categoria,
        horasPorMaquina: answer.graficos.horas_por_maquina,
        consumoPorMaterial: answer.graficos.consumo_por_material,
        arrecadacaoPorMes: answer.graficos.arrecadacao_por_mes,
        atualizado: answer.atualizado_em,
        })

    } catch (error) {
      console.error('Erro ao consultar dashboard:', error);
    }
  },

}));

export default useDashboard;