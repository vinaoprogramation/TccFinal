import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3001/impressoes'
  : 'http://192.168.1.11:3001/impressoes'
//'http://10.0.2.2:3000/usuarios'

const useImpressoes = create((set, get) => ({
  mostraAdicionar: false,
  impressoes: [],

  consultaImpressoes: async () => {

    try {
      const response = await api.get(`${baseUrl}/busca`);

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.impressoes;

      set({impressoes: answer})


    } catch (error) {
      console.error('Erro ao consultar dashboard:', error);
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


  cadastraImpressao: async (nome, categoria, tempo, maquina, material, cor, gramas) => {
    console.log()

    try {
      const response = await api.post(`${baseUrl}/cadastrar`,{
          "nome_impressao": nome,
          "categoria": categoria,
          "tempo_impressao": tempo,
          "maquina_id": maquina,
          "filamentos": [
            {
              "material": material,
              "cor": cor,
              "gramas_previstas": gramas,
            }
          ],
          "material": material,
          "cor_filamento": cor,
          "gramas": gramas
          
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
    
  }

  

}));

export default useImpressoes;