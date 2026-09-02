import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
    ? 'http://localhost:3000/catalogo'
    : 'http://10.0.2.2:3000/catalogo'
//'http://10.0.2.2:3000/usuarios'

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