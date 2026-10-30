const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';
const FormData = require('form-data');

async function perfil(token) {
  const api = await axios.get(`${BASE_URL}/usuarios/perfil`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

async function atualizarPerfil(token, body) {
  const api = await axios.put(`${BASE_URL}/usuarios/perfil`, body, { headers: { Authorization: `Bearer ${token}` } });
  console.log(api.data)
  return api.data;
}

async function enviaAvatar(token, foto) {
  const form = new FormData();
  
  // Tente mudar 'foto' para 'file' (ou 'avatar', dependendo da doc da sua API externa)
  form.append('file', foto.buffer, { 
    filename: foto.originalname || 'avatar.jpg', // Adiciona um fallback seguro
    contentType: foto.mimetype || 'image/jpeg'
  });

  const apiResponse = await axios.post(`${BASE_URL}/usuarios/avatar`, form, { 
    headers: { 
      Authorization: `Bearer ${token}`,
      ...form.getHeaders()
    } 
  });
  
  return apiResponse.data;
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
