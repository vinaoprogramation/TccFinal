const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function opcoes(token) {
  const api = await axios.get(`${BASE_URL}/maquinas/opcoes`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function listaMaquinas(token, busca, status) {
  const params = {};
  if (busca) params.busca = busca;
  if (status) params.status = status;
  const api = await axios.get(`${BASE_URL}/maquinas`, { params, headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function criarMaquina(token, body) {
  const api = await axios.post(`${BASE_URL}/maquinas`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarMaquina(token, id, body) {
  const api = await axios.put(`${BASE_URL}/maquinas/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function excluirMaquina(token, id) {
  await axios.delete(`${BASE_URL}/maquinas/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

module.exports = { opcoes, listaMaquinas, criarMaquina, atualizarMaquina, excluirMaquina };
