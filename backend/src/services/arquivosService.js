const axios = require('axios');

const FormData = require('form-data');


const BASE_URL =
  'https://api-ip3d.mbinfoseg.com.br/api';



async function enviaStl(
  token,
  stl,
  id
) {

  const formData =
    new FormData();


  formData.append(
    'arquivo',

    stl.buffer,

    {
      filename:
        stl.originalname,

      contentType:
        stl.mimetype ||
        'application/octet-stream'
    }
  );


  const api =
    await axios.post(

      `${BASE_URL}/stl/impressoes/${id}`,

      formData,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,

          ...formData.getHeaders()
        }
      }

    );


  return api.data;

}



async function baixaStl(
  token,
  id
) {

  const api =
    await axios.get(

      `${BASE_URL}/stl/${id}/download`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );


  return api.data;

}



async function excluiStl(
  token,
  id
) {

  const api =
    await axios.delete(

      `${BASE_URL}/stl/${id}`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );


  return api.data;

}



async function buscaFotosImpressao(
  token,
  id
) {

  const api =
    await axios.get(

      `${BASE_URL}/fotos/impressoes/${id}`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );


  return api.data;

}



async function enviaFotoImpressao(
  foto,
  token,
  id
) {

  const formData =
    new FormData();


  formData.append(
    'foto',

    foto.buffer,

    {
      filename:
        foto.originalname,

      contentType:
        foto.mimetype ||
        'application/octet-stream'
    }
  );


  const api =
    await axios.post(

      `${BASE_URL}/fotos/impressoes/${id}`,

      formData,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,

          ...formData.getHeaders()
        }
      }

    );


  return api.data;

}



module.exports = {

  enviaStl,

  baixaStl,

  excluiStl,

  buscaFotosImpressao,

  enviaFotoImpressao,

};