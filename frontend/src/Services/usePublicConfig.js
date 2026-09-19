import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const baseUrl = 'https://reni-3d-app.onrender.com/catalogo'

const usePublicConfig = create((set, get) => ({
    configuracoes: null,


    consultaConfiguracoes: async () => {

        try {


            const response = await api.get(`${baseUrl}/site-config`);

            console.log("Status da Resposta:", response.status);


            const answer = await response.data.configuracao;

            set({ configuracoes: answer })

        } catch (error) {
            console.error('Erro ao consultar configurações:', error);
        }
    },


}));

export default usePublicConfig;