const axios = require('axios');
const FormData = require('form-data');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';


async function buscaImpressoes(token) {
  const api = await axios.get(
    `${BASE_URL}/impressoes`, {
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  }
  );

  const response = api.data

  return response;
}


async function buscaImpressao(token, id) {
  const api = await axios.get(
    `${BASE_URL}/impressoes/${id}`, {
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  }
  );

  const response = api.data

  return response;
}


async function alteraImpressao(nome_impressao, categoria, tempo_impressao, maquina_id, filamentos, material, cor_filamento, gramas, comprador, objetivo, status, token, id) {
  const api = await axios.put(
    `${BASE_URL}/impressoes/${id}`, {
    "nome_impressao": nome_impressao,
    "categoria": categoria,
    "tempo_impressao": tempo_impressao,
    "maquina_id": maquina_id,
    "filamentos": filamentos,
    "material": material,
    "cor_filamento": cor_filamento,
    "gramas": gramas,
    "comprador": comprador,
    "objetivo": objetivo,
    "status": status,
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




async function buscaFalhas(token) {

  const api = await axios.get(
    `${BASE_URL}/impressoes/falhas`, {
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  }
  );

  const response = api.data

  return response;
}


async function buscaFalhaFoto(token, falhaId) {

  const api = await axios.get(
    `${BASE_URL}/impressoes/falhas/${falhaId}/foto`, {
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  }
  );

  const response = api.data

  return response;
}




async function cadastrarImpressao(nome_impressao, categoria, tempo_impressao, maquina_id, filamentos, material, cor_filamento, gramas, comprador, objetivo, status, token) {

  const api = await axios.post(
    `${BASE_URL}/impressoes`, {
    "nome_impressao": nome_impressao,
    "categoria": categoria,
    "tempo_impressao": tempo_impressao,
    "maquina_id": maquina_id,
    "filamentos": filamentos,
    "material": material,
    "cor_filamento": cor_filamento,
    "gramas": gramas,
    "comprador": comprador,
    "objetivo": objetivo,
    "status": status,
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



async function deletarImpressao(token, Id) {

  const api = await axios.delete(
    `${BASE_URL}/impressoes/${Id}`, {
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  }
  );

  const response = api.data

  return response;
}




async function alterarStatus(status, comprador, objetivo, token, Id) {

  const api = await axios.patch(
    `${BASE_URL}/impressoes/${Id}/status`, {
    "status": status,
    "comprador": comprador,
    "objetivo": objetivo,
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



async function alterarFalha(foto, percentual_falha, consumos, observacao, token, Id) {
  const form = new FormData();
  // foto is expected to be a Buffer
  form.append('foto', foto, { filename: 'foto.jpg' });
  form.append('percentual_falha', percentual_falha);
  form.append('consumos', JSON.stringify(consumos));
  if (observacao) form.append('observacao', observacao);

  const api = await axios.post(
    `${BASE_URL}/impressoes/${Id}/falha`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...form.getHeaders()
      }
    }
  );

  return api.data;
}






module.exports = {
  buscaImpressoes,
  buscaImpressao,
  alteraImpressao,
  buscaFalhas,
  buscaFalhaFoto,
  cadastrarImpressao,
  deletarImpressao,
  alterarStatus,
  alterarFalha,
};
