import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3001'
  : 'http://192.168.1.11:3000/'
  //'http://10.0.2.2:3000/usuarios'

const passarTela = create((set, get) => ({
    mostra: false,
    filtroUsado: false,

    setMostra: () => {
        const v = get().mostra;
        if(v === true){
            set({mostra: false});
        } else{
            set({mostra: true});
        }
        
    },

    setFiltros: () => {
        const v = get().filtroUsado;
        if(v === true){
            set({filtroUsado: false});
        } else{
            set({filtroUsado: true});
        }
        
    }

}));

export default passarTela;