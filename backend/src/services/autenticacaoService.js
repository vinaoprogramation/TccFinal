const axios = require('axios');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function login(email, senha) {
  
   const api = await axios.post(
      `${BASE_URL}/auth/login`,{
        "email": email,
        "senha": senha
      }, {
        family: 4
      }
    );

    const response = api.data

    return response;
}


async function registrar(nome, email, matricula, senha, perfil, curso, token) {

   const api = await axios.post(
      `${BASE_URL}/auth/register`,{
        "nome": nome,
        "email": email,
        "matricula": matricula,
        "senha": senha,
        "perfil": perfil,
        "curso": curso,
      },
      {
        "headers":{
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    return response;
}

async function consultarEu(token) {

   const api = await axios.get(
      `${BASE_URL}/auth/me`,{
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    const fotoperfil = api?.data?.usuario?.id
    const foto = await axios.get(`${BASE_URL}/catalogo/usuarios/${fotoperfil}/avatar`, {
      responseType: 'arraybuffer' // Use arraybuffer no Node.js
  });

  // Converte o buffer para uma string Base64 utilizável
  const base64Image = Buffer.from(foto.data, 'binary').toString('base64');
  const fotoPerfil = `data:image/webp;base64,${base64Image}`;

  return { response, fotoPerfil };
}




module.exports = {
  login,
  registrar,
  consultarEu,
};