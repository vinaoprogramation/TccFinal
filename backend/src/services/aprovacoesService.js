const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function listaPendentes(token) {
  const api = await axios.get(`${BASE_URL}/aprovacoes/pendentes`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function aprovarRejeitar(token, id, body) {
  const api = await axios.patch(`${BASE_URL}/aprovacoes/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

module.exports = { listaPendentes, aprovarRejeitar };
