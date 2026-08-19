const axios = require('axios');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function statusSetup() {
  const api = await axios.get(`${BASE_URL}/setup/status`);
  return api.data;
}

async function criarSetup(nome, email, senha, site_nome, logo_url, cor_primaria, cor_secundaria) {
  const api = await axios.post(`${BASE_URL}/setup`, {
    nome,
    email,
    senha,
    site_nome,
    logo_url,
    cor_primaria,
    cor_secundaria,
  });

  return api.data;
}

module.exports = {
  statusSetup,
  criarSetup,
};
