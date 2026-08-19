const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function consultaRelatorios(token, tipo, referencia) {
  const params = {};
  if (tipo) params.tipo = tipo;
  if (referencia) params.referencia = referencia;
  const api = await axios.get(`${BASE_URL}/relatorios`, { params, headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

module.exports = { consultaRelatorios };
