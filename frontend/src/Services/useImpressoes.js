import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';


const isWeb = Platform.OS === 'web';


const baseUrl = isWeb
  ? 'http://localhost:3000/impressoes'
  : 'http://192.168.1.11:3000/impressoes';


const arquivosUrl = isWeb
  ? 'http://localhost:3000/arquivos'
  : 'http://192.168.1.11:3000/arquivos';


const useImpressoes = create((set, get) => ({

  mostraAdicionar: false,

  mostraDeletar: false,

  impressoes: [],

  id: null,

  mostraConcluir: false,

  mostraFalha: false,

  filtrosUsado: false,

  recarregando: false,


  consultaImpressoes: async (
    categoria,
    material,
    status
  ) => {

    console.log(
      categoria,
      material,
      status
    );


    const params = {};


    if (categoria) {
      params.categoria = categoria;
    }


    if (material) {
      params.material = material;
    }


    if (status) {
      params.status = status;
    }


    try {

      const response =
        await api.get(
          `${baseUrl}/busca`,
          { params }
        );


      console.log(
        "Status da Resposta:",
        response.status
      );


      const answer =
        await response.data.impressoes;


      set({

        impressoes: answer,

        recarregando: false

      });


    } catch (error) {

      console.error(
        'Erro ao consultar impressoes:',
        error
      );

    }

  },


  decideAprovacao: async (
    id,
    status,
    observacao
  ) => {

    try {

      const response =
        await api.patch(
          `${baseUrl}/aprovacoes/${id}`,
          {
            "status": status,
            "observacao": observacao,
          }
        );


      console.log(
        "Status da Resposta:",
        response.status
      );


      const answer =
        await response.data;


      if (answer) {
        return true;
      }


    } catch (error) {

      console.error(
        'Erro ao DECIDIR:',
        error
      );

    }

  },


  alteraStatus: async (
    id,
    comprador,
    objetivo
  ) => {

    try {

      const response =
        await api.patch(
          `${baseUrl}/altera/status/${id}`,
          {
            "status": "Concluida",
            "comprador": "string",
            "objetivo": "string"
          }
        );


      console.log(
        "Status da Resposta:",
        response.status
      );


      const answer =
        await response.data;


      if (answer) {
        return true;
      }


    } catch (error) {

      console.error(
        'Erro ao concluir:',
        error
      );

    }

  },


  reportaFalha: async (
    id,
    foto,
    percentualFalha,
    material,
    cor,
    gramasPerdidas,
    observacao
  ) => {

    try {

      const formData =
        new FormData();


      formData.append(
        "foto",
        {
          uri: foto.uri,
          name:
            foto.name ||
            `foto-${Date.now()}.jpg`,
          type:
            foto.type ||
            "image/jpeg"
        }
      );


      formData.append(
        "percentual_falha",
        String(percentualFalha)
      );


      formData.append(
        "consumos",
        JSON.stringify([
          {
            material: material,
            cor: cor,
            gramas_perdidas:
              String(gramasPerdidas)
          }
        ])
      );


      formData.append(
        "observacao",
        observacao
      );


      const response =
        await api.patch(
          `${baseUrl}/altera/falha/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );


      console.log(
        "Status da Resposta:",
        response.status
      );


      console.log(
        "Resposta da falha:",
        response.data
      );


      if (response.data) {
        return true;
      }


      return false;


    } catch (error) {

      console.error(
        "Erro ao reportar falha:",
        error.response?.data ||
        error.message ||
        error
      );


      return false;

    }

  },


  enviaStl: async (
    id,
    arquivo
  ) => {

    try {

      if (!id || !arquivo) {
        return false;
      }


      const formData =
        new FormData();


      formData.append(
        "stl",
        {
          uri: arquivo.uri,

          name:
            arquivo.name ||
            `arquivo-${Date.now()}.stl`,

          type:
            arquivo.mimeType ||
            "application/octet-stream"
        }
      );


      const response =
        await api.post(

          `${arquivosUrl}/envia/stl/${id}`,

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }

        );


      console.log(
        "Status do upload STL:",
        response.status
      );


      console.log(
        "Resposta do upload STL:",
        response.data
      );


      if (response.data) {
        return true;
      }


      return false;


    } catch (error) {

      console.error(
        "Erro ao enviar STL:",
        error.response?.data ||
        error.message ||
        error
      );


      return false;

    }

  },


  enviaFoto: async (
    id,
    arquivo
  ) => {

    try {

      if (!id || !arquivo) {
        return false;
      }


      const formData =
        new FormData();


      formData.append(
        "foto",
        {
          uri: arquivo.uri,

          name:
            arquivo.fileName ||
            `midia-${Date.now()}`,

          type:
            arquivo.mimeType ||
            "application/octet-stream"
        }
      );


      const response =
        await api.post(

          `${arquivosUrl}/envia/foto/impressao/${id}`,

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }

        );


      console.log(
        "Status do upload da foto:",
        response.status
      );


      console.log(
        "Resposta da foto:",
        response.data
      );


      if (response.data) {
        return true;
      }


      return false;


    } catch (error) {

      console.error(
        "Erro ao enviar foto:",
        error.response?.data ||
        error.message ||
        error
      );


      return false;

    }

  },


  cadastraImpressao: async (
    nome,
    categoria,
    tempo,
    maquina,
    material,
    cor,
    gramas,
    objetivo,
    comprador
  ) => {

    console.log(
      nome,
      categoria,
      tempo,
      maquina,
      material,
      cor,
      gramas,
      objetivo,
      comprador
    );


    try {

      const response =
        await api.post(
          `${baseUrl}/cadastrar`,
          {
            "nome_impressao": nome,
            "categoria": categoria,
            "tempo_impressao": tempo,
            "maquina_id": maquina,

            "filamentos": [
              {
                "material": material,
                "cor": cor
                  ? cor
                  : "Material Próprio",
                "gramas_previstas": gramas,
              }
            ],

            "material": material,

            "cor_filamento": cor
              ? cor
              : "Material Próprio",

            "gramas": gramas,

            "comprador": comprador
              ? comprador
              : null,

            "objetivo": objetivo
              ? objetivo
              : null,
          }
        );


      console.log(
        "Status da Resposta:",
        response.status
      );


      const answer =
        await response.data;


      if (answer) {
        return true;
      }


    } catch (error) {

      console.error(
        'Erro ao DECIDIR:',
        error
      );

    }

  },


  setMostraAdicionar: () => {

    const mostra =
      get().mostraAdicionar;


    if (mostra == false) {

      set({
        mostraAdicionar: true
      });

    } else {

      set({
        mostraAdicionar: false
      });

    }

  },


  setMostraFiltros: () => {

    const mostra =
      get().filtrosUsado;


    if (mostra == false) {

      set({
        filtrosUsado: true
      });

      console.log(
        "setou: " +
        get().filtrosUsado
      );

    } else {

      set({
        filtrosUsado: false
      });

      console.log(
        "setou: " +
        get().filtrosUsado
      );

    }

  },


  setMostraFalha: () => {

    const mostra =
      get().mostraFalha;


    if (mostra == false) {

      set({
        mostraFalha: true
      });

    } else {

      set({
        mostraFalha: false
      });

    }

  },


  setMostraConcluir: () => {

    const mostra =
      get().mostraConcluir;


    if (mostra == false) {

      set({
        mostraConcluir: true
      });

    } else {

      set({
        mostraConcluir: false
      });

    }

  },


  setMostraDeletar: () => {

    const mostra =
      get().mostraDeletar;


    if (mostra == false) {

      set({
        mostraDeletar: true
      });

    } else {

      set({
        mostraDeletar: false
      });

    }

  },


  deletaImpressao: async (
    id
  ) => {

    console.log(
      "Id: " + id
    );


    try {

      const response =
        await api.delete(
          `${baseUrl}/deletar/${id}`
        );


      console.log(
        "Status da Resposta:",
        response.status
      );


      const answer =
        await response;


      if (answer) {
        return true;
      }


    } catch (error) {

      console.error(
        'Erro ao deletar impressão:',
        error
      );

    }

  },


  setaId: (id) => {

    set({
      id: id
    });

  },


  setRecarregando: (
    condicao
  ) => {

    set({
      recarregando: condicao
    });

  }

}));


export default useImpressoes;