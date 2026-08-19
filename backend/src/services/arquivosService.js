const axios = require('axios');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';


async function enviaStl(token, stl, id) {

   const api = await axios.post(
      `${BASE_URL}/stl/impressoes/${id}`,
      {
        "arquivo": stl
      },
      {
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    return response;
}



async function baixaStl(token, id) {

   const api = await axios.get(
      `${BASE_URL}/stl/${id}/download`,
      {
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    return response;
}




async function excluiStl(token, id) {

   const api = await axios.delete(
      `${BASE_URL}/stl/${id}`,
      {
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    return response;
}


async function buscaFotosImpressao(token, id) {

   const api = await axios.get(
      `${BASE_URL}/fotos/impressoes/${id}`,
      {
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    return response;
}





async function enviaFotoImpressao(foto, token, id) {

   const api = await axios.post(
      `${BASE_URL}/fotos/impressoes/${id}`,
      {
        "foto": foto
      },
      {
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const response = api.data

    return response;
}





module.exports = {
  enviaStl,
  baixaStl,
  excluiStl,
  buscaFotosImpressao,
  enviaFotoImpressao,
};