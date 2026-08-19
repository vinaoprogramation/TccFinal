const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function listaNotificacoes(token) {
  const api = await axios.get(`${BASE_URL}/notificacoes`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function enviarMensagem(token, body) {
  const api = await axios.post(`${BASE_URL}/notificacoes/mensagens`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function marcarLida(token, id) {
  await axios.patch(`${BASE_URL}/notificacoes/${id}/lida`, null, { headers: { Authorization: `Bearer ${token}` } });
}

async function excluirLidas(token) {
  await axios.delete(`${BASE_URL}/notificacoes/lidas`, { headers: { Authorization: `Bearer ${token}` } });
}

async function excluirNotificacao(token, id) {
  await axios.delete(`${BASE_URL}/notificacoes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

module.exports = { listaNotificacoes, enviarMensagem, marcarLida, excluirLidas, excluirNotificacao };
