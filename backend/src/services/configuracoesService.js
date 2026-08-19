const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function opcoes(token) {
  const api = await axios.get(`${BASE_URL}/configuracoes/opcoes`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function listaMateriais(token) {
  const api = await axios.get(`${BASE_URL}/configuracoes/materiais`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function criarMaterial(token, body) {
  const api = await axios.post(`${BASE_URL}/configuracoes/materiais`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarMaterial(token, id, body) {
  const api = await axios.put(`${BASE_URL}/configuracoes/materiais/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function excluirMaterial(token, id) {
  await axios.delete(`${BASE_URL}/configuracoes/materiais/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

async function listaCategorias(token) {
  const api = await axios.get(`${BASE_URL}/configuracoes/categorias`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function criarCategoria(token, body) {
  const api = await axios.post(`${BASE_URL}/configuracoes/categorias`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarCategoria(token, id, body) {
  const api = await axios.put(`${BASE_URL}/configuracoes/categorias/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function excluirCategoria(token, id) {
  await axios.delete(`${BASE_URL}/configuracoes/categorias/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

async function siteGet(token) {
  const api = await axios.get(`${BASE_URL}/configuracoes/site`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function sitePut(token, body) {
  const api = await axios.put(`${BASE_URL}/configuracoes/site`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

module.exports = { opcoes, listaMateriais, criarMaterial, atualizarMaterial, excluirMaterial, listaCategorias, criarCategoria, atualizarCategoria, excluirCategoria, siteGet, sitePut };
