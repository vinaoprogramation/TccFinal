import { create } from 'zustand';
import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';

const baseUrl = isWeb
  ? 'http://localhost:3000'
  : 'http://192.168.1.11:3000';

const useCatalogo = create((set) => ({

  projetos: [],
  projetoIndividual: [],
  alunos: [],
  categorias: [],
  materiais: [],
  recarregando: false,

  stlDisponivel: false,
  verificandoStl: false,

  consultaCatalogo: async (
    busca,
    categoria,
    material,
    aluno
  ) => {
    try {
      const params = {};

      if (busca) params.busca = busca;
      if (categoria) params.categoria = categoria;
      if (material) params.material = material;
      if (aluno) params.aluno = aluno;

      const response = await api.get(
        `${baseUrl}/catalogo`,
        { params }
      );

      console.log(
        'Status da Resposta:',
        response.status
      );

      set({
        projetos: response.data.resultado || []
      });

    } catch (error) {
      console.error(
        'Erro ao consultar catálogo:',
        error?.response?.data || error?.message || error
      );
    }
  },

  consultaFiltros: async () => {
    try {
      const response = await api.get(
        `${baseUrl}/catalogo/filtros`
      );

      console.log(
        'Status da Resposta:',
        response.status
      );

      set({
        alunos: response.data?.alunos || [],
        categorias: response.data?.categorias || [],
        materiais: response.data?.materiais || []
      });

    } catch (error) {
      console.error(
        'Erro ao consultar filtros:',
        error?.response?.data || error?.message || error
      );
    }
  },

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

      set({
        projetoIndividual:
          response.data?.listaFotos || []
      });

    } catch (error) {
      console.error(
        'Erro ao consultar projeto:',
        error?.response?.data || error?.message || error
      );

      set({
        projetoIndividual: []
      });
    }
  },

  verificarStl: async (id) => {
    if (!id) {
      set({
        stlDisponivel: false,
        verificandoStl: false
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
        '[STL] Verificando:',
        url
      );

      const response = await api.get(
        url,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );

      console.log(
        '[STL] Status:',
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
        '[STL] Erro ao verificar:',
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

  obterUrlDownloadStl: (id) => {
    if (!id) {
      return null;
    }

    return `${baseUrl}/catalogo/stl/${id}/download`;
  },

  testarDownloadStl: async (id) => {
    if (!id) {
      throw new Error(
        'ID do projeto não informado.'
      );
    }

    const url =
      `${baseUrl}/catalogo/stl/${id}/download`;

    try {
      const response = await api.get(
        url,
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/octet-stream'
          }
        }
      );

      console.log(
        '[STL] Status:',
        response.status
      );

      console.log(
        '[STL] Content-Type:',
        response.headers?.['content-type']
      );

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

  setRecarregando: (condicao) => {
    set({
      recarregando: condicao
    });
  }

}));

export default useCatalogo;
export { baseUrl };