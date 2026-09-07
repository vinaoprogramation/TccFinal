import { create } from 'zustand';
import {
  storeToken,
  getToken,
  removeToken
} from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';

const baseUrl = isWeb
  ? 'http://localhost:3000'
  : 'http://192.168.1.11:3000';

// 'http://10.0.2.2:3000/usuarios'


const useCatalogo = create((set, get) => ({

  /*
   * ============================================================
   * ESTADOS
   * ============================================================
   */

  projetos: [],

  projetoIndividual: [],

  alunos: [],

  categorias: [],

  materiais: [],

  recarregando: false,

  stlDisponivel: false,

  verificandoStl: false,

  baixandoStl: false,


  /*
   * ============================================================
   * CONSULTA DO CATÁLOGO
   * ============================================================
   */

  consultaCatalogo: async (
    busca,
    categoria,
    material,
    aluno
  ) => {

    console.log(
      busca,
      categoria,
      material,
      aluno
    );

    try {

      const params = {};

      if (busca) {
        params.busca = busca;
      }

      if (categoria) {
        params.categoria = categoria;
      }

      if (material) {
        params.material = material;
      }

      if (aluno) {
        params.aluno = aluno;
      }


      const response = await api.get(
        `${baseUrl}/catalogo`,
        {
          params
        }
      );


      console.log(
        'Status da Resposta:',
        response.status
      );


      const answer =
        response.data.resultado;


      set({
        projetos: answer
      });

    } catch (error) {

      console.error(
        'Erro ao consultar catálogo:',
        error
      );

    }

  },


  /*
   * ============================================================
   * CONSULTA DOS FILTROS
   * ============================================================
   */

  consultaFiltros: async () => {

    try {

      const response = await api.get(
        `${baseUrl}/catalogo/filtros`
      );


      console.log(
        'Status da Resposta:',
        response.status
      );


      const answer =
        response.data;


      set({

        alunos: answer.alunos,

        categorias: answer.categorias,

        materiais: answer.materiais

      });

    } catch (error) {

      console.error(
        'Erro ao consultar filtros:',
        error
      );

    }

  },


  /*
   * ============================================================
   * CONSULTA DE UM PROJETO
   * ============================================================
   */

  consultaProjeto: async (id) => {

    set({
      projetoIndividual: null
    });


    try {

      const response = await api.get(
        `${baseUrl}/catalogo/${id}`
      );


      console.log(
        'Status da Resposta:',
        response.status
      );


      const answer =
        response.data.listaFotos;


      set({
        projetoIndividual: answer
      });

    } catch (error) {

      console.error(
        'Erro ao consultar projeto:',
        error
      );

    }

  },


  /*
   * ============================================================
   * VERIFICAR SE O STL EXISTE
   * ============================================================
   *
   * Endpoint esperado:
   *
   * GET /catalogo/stl/:id/verificar
   *
   * Resposta esperada:
   *
   * {
   *   "disponivel": true
   * }
   *
   * ou:
   *
   * {
   *   "disponivel": false
   * }
   *
   */

  verificarStl: async (id) => {

    if (!id) {

      set({
        stlDisponivel: false
      });

      return false;
    }


    set({
      verificandoStl: true,
      stlDisponivel: false
    });


    try {

      const url =
        `${baseUrl}/catalogo/stl/${id}/verificar`;


      console.log(
        '[STL] Verificando arquivo:',
        url
      );


      const response = await api.get(
        url
      );


      console.log(
        '[STL] Status da verificação:',
        response.status
      );


      console.log(
        '[STL] Resposta:',
        response.data
      );


      const disponivel =
        response.data?.disponivel === true;


      set({
        stlDisponivel: disponivel
      });


      return disponivel;

    } catch (error) {

      console.error(
        '[STL] Erro ao verificar STL:',
        error?.response?.data ||
        error?.message ||
        error
      );


      set({
        stlDisponivel: false
      });


      return false;

    } finally {

      set({
        verificandoStl: false
      });

    }

  },


  /*
   * ============================================================
   * OBTÉM A URL DE DOWNLOAD DO STL
   * ============================================================
   *
   * Endpoint esperado:
   *
   * GET /catalogo/stl/:id/download
   *
   * IMPORTANTE:
   *
   * Esta função NÃO baixa o arquivo.
   *
   * Ela apenas monta a URL correta.
   *
   * O DetailScreen usa essa URL com expo-file-system
   * para realmente salvar o arquivo no aparelho.
   *
   */

  obterUrlDownloadStl: (id) => {

    if (!id) {
      return null;
    }


    const url =
      `${baseUrl}/catalogo/stl/${id}/download`;


    console.log(
      '[STL] URL de download:',
      url
    );


    return url;

  },


  /*
   * ============================================================
   * FUNÇÃO DE DOWNLOAD
   * ============================================================
   *
   * Esta função faz uma requisição ao endpoint e retorna
   * a resposta do backend.
   *
   * Ela pode ser usada para verificar se o endpoint realmente
   * está respondendo antes de salvar o arquivo pelo
   * expo-file-system.
   *
   */

  testarDownloadStl: async (id) => {

    if (!id) {

      throw new Error(
        'ID do projeto não informado.'
      );

    }


    const url =
      `${baseUrl}/catalogo/stl/${id}/download`;


    console.log(
      '[STL] Testando download:',
      url
    );


    try {

      const response = await api.get(
        url,
        {
          responseType: 'arraybuffer'
        }
      );


      console.log(
        '[STL] Status do download:',
        response.status
      );


      console.log(
        '[STL] Content-Type:',
        response.headers?.['content-type']
      );


      console.log(
        '[STL] Tamanho recebido:',
        response.data?.byteLength
      );


      if (response.status !== 200) {

        throw new Error(
          `Servidor respondeu HTTP ${response.status}.`
        );

      }


      if (!response.data) {

        throw new Error(
          'Servidor não retornou conteúdo.'
        );

      }


      return response;

    } catch (error) {

      console.error(
        '[STL] Erro no download:',
        error?.response?.data ||
        error?.message ||
        error
      );


      throw error;

    }

  },


  /*
   * ============================================================
   * ESTADO DE RECARREGAMENTO
   * ============================================================
   */

  setRecarregando: (condicao) => {

    set({
      recarregando: condicao
    });

  }

}));


export default useCatalogo;

export {
  baseUrl
};