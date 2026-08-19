const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function perfil(token) {
  const api = await axios.get(`${BASE_URL}/usuarios/perfil`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarPerfil(token, body) {
  const api = await axios.put(`${BASE_URL}/usuarios/perfil`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function enviaAvatar(token, body) {
  const api = await axios.post(`${BASE_URL}/usuarios/avatar`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function listaUsuarios(token) {
  const api = await axios.get(`${BASE_URL}/usuarios`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function criarUsuario(token, body) {
  const api = await axios.post(`${BASE_URL}/usuarios`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarUsuario(token, id, body) {
  const api = await axios.put(`${BASE_URL}/usuarios/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function excluirUsuario(token, id) {
  await axios.delete(`${BASE_URL}/usuarios/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

module.exports = { perfil, atualizarPerfil, enviaAvatar, listaUsuarios, criarUsuario, atualizarUsuario, excluirUsuario };
