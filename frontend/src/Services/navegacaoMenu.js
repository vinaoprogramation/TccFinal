import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3000'
  : 'http://10.0.2.2:3000'
  //'http://10.0.2.2:3000/usuarios'

const navegacaoMenu = create((set, get) => ({
    mostraMenu: false,

    setMostra: () => {
        const v = get().mostraMenu;
        if(v === true){
            set({mostraMenu: false});
        } else{
            set({mostraMenu: true});
        }
    },


    iniciaMenu: () => {
      set({mostraMenu: false})
    },

}));

export default navegacaoMenu;