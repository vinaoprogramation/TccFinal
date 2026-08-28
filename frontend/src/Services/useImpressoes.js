import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3000/impressoes'
  : 'http://10.0.2.2:3000/impressoes'
//'http://10.0.2.2:3000/usuarios'

const useImpressoes = create((set, get) => ({
  mostraAdicionar: false,
  mostraDeletar: false,
  impressoes: [],
  id: null,
  mostraConcluir: false,
  mostraFalha: false,

  consultaImpressoes: async () => {

    try {
      const response = await api.get(`${baseUrl}/busca`);

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.impressoes;

      set({impressoes: answer})


    } catch (error) {
      console.error('Erro ao consultar impressoes:', error);
    }
  },


  decideAprovacao: async (id, status, observacao) => {

    try {
      const response = await api.patch(`${baseUrl}/aprovacoes/${id}`,{
          "status": status,
          "observacao": observacao,
        
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }


    } catch (error) {
      console.error('Erro ao DECIDIR:', error);
    }
  },


  alteraStatus: async (id, comprador, objetivo) => {

    try {
      const response = await api.patch(`${baseUrl}/altera/status/${id}`,{
        "status": "Concluida",
        "comprador": "string",
        "objetivo": "string"
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }


    } catch (error) {
      console.error('Erro ao concluir:', error);
    }
  },


  reportaFalha: async (id, foto, percentualFalha, material, cor, gramasPerdidas, observacao) => {

    try {
      const response = await api.patch(`${baseUrl}/altera/falha/${id}`,{
        "foto": foto,
        "percentual_falha": percentualFalha,
        "consumos": [
          {
            "material": material,
            "cor": cor,
            "gramas_perdidas": gramasPerdidas,
          }
        ],
        "observacao": observacao
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }


    } catch (error) {
      console.error('Erro ao concluir:', error);
    }
  },





  cadastraImpressao: async (nome, categoria, tempo, maquina, material, cor, gramas, objetivo, comprador) => {
    console.log(nome, categoria, tempo, maquina, material, cor, gramas, objetivo, comprador)

    try {
      const response = await api.post(`${baseUrl}/cadastrar`,{
          "nome_impressao": nome,
          "categoria": categoria,
          "tempo_impressao": tempo,
          "maquina_id": maquina,
          "filamentos": [
            {
              "material": material,
              "cor": cor? cor : "Material Próprio",
              "gramas_previstas": gramas,
            }
          ],
          "material": material,
          "cor_filamento": cor? cor : "Material Próprio",
          "gramas": gramas,
          "comprador": comprador? comprador : null,
          "objetivo": objetivo? objetivo : null,
          
      });

      console.log("Status da Resposta:", response.status);

      const answer = await response.data;

      if(answer){
        return true;
      }


    } catch (error) {
      console.error('Erro ao DECIDIR:', error);
    }
  },

  setMostraAdicionar: () => {
    const mostra = get().mostraAdicionar;
    if(mostra == false){
      set({mostraAdicionar: true})
    } else{
      set({mostraAdicionar: false})
    }
    
  },

  setMostraFalha: () => {
    const mostra = get().mostraFalha;
    if(mostra == false){
      set({mostraFalha: true})
    } else{
      set({mostraFalha: false})
    }
    
  },

  setMostraConcluir: () => {
    const mostra = get().mostraConcluir;
    if(mostra == false){
      set({mostraConcluir: true})
    } else{
      set({mostraConcluir: false})
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


  deletaImpressao: async (id) => {
    console.log("Id: "+id)

    try {
      const response = await api.delete(`${baseUrl}/deletar/${id}`);

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
  }

  

}));

export default useImpressoes;