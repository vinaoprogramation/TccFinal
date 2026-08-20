import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'https://glorious-space-garbanzo-g47rjx6vx7px2v4r6-3000.app.github.dev'  
  : 'http://10.0.2.2:3000';
  //'http://10.0.2.2:3000/usuarios'

const passarTela = create((set, get) => ({
    mostra: false,

    setMostra: () => {
        const v = get().mostra;
        if(v === true){
            set({mostra: false});
        } else{
            set({mostra: true});
        }
        console.log(get().mostra)
        
    }

}));

export default passarTela;