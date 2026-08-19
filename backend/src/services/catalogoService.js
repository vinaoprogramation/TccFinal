const axios = require('axios');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function listaProjetos(busca, categoria, material, aluno) {
  const params = {};
  if (busca) params.busca = busca;
  if (categoria) params.categoria = categoria;
  if (material) params.material = material;
  if (aluno) params.aluno = aluno;

  const api = await axios.get(`${BASE_URL}/catalogo`, { params });
  return api.data;
}

async function filtrosCatalogo() {
  const api = await axios.get(`${BASE_URL}/catalogo/filtros`);
  return api.data;
}

async function consultaProjeto(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/${id}`);
  return api.data;
}

async function visualizarFotoPublica(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/fotos/${id}/visualizar`);
  return api.data;
}

async function avatarPublico(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/usuarios/${id}/avatar`);
  return api.data;
}

async function downloadStlPublico(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/stl/${id}/download`);
  return api.data;
}

module.exports = {
  listaProjetos,
  filtrosCatalogo,
  consultaProjeto,
  visualizarFotoPublica,
  avatarPublico,
  downloadStlPublico,
};
