import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3000/estoque'
  : 'http://192.168.1.11:3000/estoque'
//'http://10.0.2.2:3000/usuarios'

const useEstoque = create((set, get) => ({
  estoque: [],
  materiais: [],
  mostraAdicionar: false,
  mostraAdicionarRolo: false,
  mostraDeletar: false,
  id:null,

  consultaEstoque: async () => {

    try {
      const response = await api.get(`${baseUrl}`);

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      set({ estoque: answer.itens, materiais: answer.resumo_por_material })

    } catch (error) {
      console.error('Erro ao consultar uruário:', error);
    }
  },


  adicionaEstoque: async (material, cor, pesoInicial, entrada, saida, dataEntrada) => {

    try {
      const response = await api.post(`${baseUrl}`, {
        "material": material,
        "cor": cor,
        "peso_inicial": pesoInicial,
        "entrada": entrada,
        "saida": saida,
        "data_entrada": dataEntrada
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }

    } catch (error) {
      console.error('Erro ao consultar uruário:', error);
    }
  },



  adicionaRolo: async (peso, dataMovimentacao, observacao, id) => {
    console.log("Parametros: "+ peso, dataMovimentacao, observacao, id)

    try {
      const response = await api.post(`${baseUrl}/${id}/entrada`, {
        "peso": peso,
        "data_movimentacao": dataMovimentacao,
        "observacao": observacao
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }

    } catch (error) {
      console.error('Erro ao consultar uruário:', error);
    }
  },



  deletaEstoque: async (id) => {
    console.log("Id: "+id)

    try {
      const response = await api.delete(`${baseUrl}/${id}`);

      console.log("Status da Resposta:", response.status);


      const answer = await response;

      if(answer){
        return true;
      }


    } catch (error) {
      console.error('Erro ao deletar impressão:', error);
    }
  },

  setaId: (id) => {
    set({id: id});
  },


  setMostraAdicionar: () => {
    const mostra = get().mostraAdicionar;
    if(mostra == false){
      set({mostraAdicionar: true})
    } else{
      set({mostraAdicionar: false})
    }
    
  },


  setMostraAdicionarRolo: () => {
    const mostra = get().mostraAdicionarRolo;
    if(mostra == false){
      set({mostraAdicionarRolo: true})
    } else{
      set({mostraAdicionarRolo: false})
    }
    
  },


  setMostraDeletar: () => {
    const mostra = get().mostraDeletar;
    if(mostra == false){
      set({mostraDeletar: true})
    } else{
      set({mostraDeletar: false})
    }
    
  },


}));

export default useEstoque;