const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function listaFinanceiro(token, busca, categoria, forma_pagamento) {
  const params = {};
  if (busca) params.busca = busca;
  if (categoria) params.categoria = categoria;
  if (forma_pagamento) params.forma_pagamento = forma_pagamento;
  const api = await axios.get(`${BASE_URL}/financeiro`, { params, headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function criarRecebimento(token, body) {
  const api = await axios.post(`${BASE_URL}/financeiro`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function dashboardFinanceiro(token) {
  const api = await axios.get(`${BASE_URL}/financeiro/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function pendentes(token) {
  const api = await axios.get(`${BASE_URL}/financeiro/pendentes`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarRecebimento(token, id, body) {
  const api = await axios.put(`${BASE_URL}/financeiro/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function excluirRecebimento(token, id) {
  await axios.delete(`${BASE_URL}/financeiro/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

module.exports = { listaFinanceiro, criarRecebimento, dashboardFinanceiro, pendentes, atualizarRecebimento, excluirRecebimento };
