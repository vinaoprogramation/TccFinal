import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

import api from './api';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb
  ? 'http://localhost:3000'
  : 'http://192.168.1.11:3000'
//'http://10.0.2.2:3000/usuarios'

const useCatalogo = create((set, get) => ({
  projetos: [],
  projetoIndividual: [],
  alunos: [],
  categorias: [],
  materiais: [],


  consultaCatalogo: async (busca, categoria, material, aluno) => {
    console.log(busca, categoria, material, aluno)

    try {

      const params = {};
      if (busca) params.busca = busca;
      if (categoria) params.categoria = categoria;
      if (material) params.material = material;
      if (aluno) params.aluno = aluno;


      const response = await api.get(`${baseUrl}/catalogo`, {params});

      console.log("Status da Resposta:", response.status);


      const answer = await response.data.resultado;



      set({ projetos: answer })

    } catch (error) {
      console.error('Erro ao consultar catálogo:', error);
    }
  },



  consultaFiltros: async () => {

    try {

      const response = await api.get(`${baseUrl}/catalogo/filtros`, {
      });

      console.log("Status da Resposta:", response.status);


      const answer = await response.data;

      set({ alunos: answer.alunos, categorias: answer.categorias, materiais: answer.materiais })


    } catch (error) {
      console.error('Erro ao consultar catálogo:', error);
    }
  },



  consultaProjeto: async (id) => {
    set({ projetoIndividual: null });


    try {
      const response = await api.get(`${baseUrl}/catalogo/${id}`);

      console.log("Status da Resposta:", response.status);

      const answer = await response.data.listaFotos;

      set({ projetoIndividual: answer })

    } catch (error) {
      console.error('Erro ao consultar projeto:', error);
    }
  },


}));

export default useCatalogo;