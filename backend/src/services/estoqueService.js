const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function opcoes(token) {
  const api = await axios.get(`${BASE_URL}/estoque/opcoes`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function listaEstoque(token, busca, material) {
  const params = {};
  if (busca) params.busca = busca;
  if (material) params.material = material;
  const api = await axios.get(`${BASE_URL}/estoque`, { params, headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function criarItem(token, body) {
  const api = await axios.post(`${BASE_URL}/estoque`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function entrada(token, id, body) {
  const api = await axios.post(`${BASE_URL}/estoque/${id}/entrada`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarItem(token, id, body) {
  const api = await axios.put(`${BASE_URL}/estoque/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function excluirItem(token, id) {
  await axios.delete(`${BASE_URL}/estoque/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

module.exports = { opcoes, listaEstoque, criarItem, entrada, atualizarItem, excluirItem };
