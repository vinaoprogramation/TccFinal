
const axios = require('axios');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function listaProjetos(busca, categoria, material, aluno) {
  const params = {};

  if (busca) params.busca = busca;
  if (categoria) params.categoria = categoria;
  if (material) params.material = material;
  if (aluno) params.aluno = aluno;

  const api = await axios.get(`${BASE_URL}/catalogo`, { params });
  const projetos = api.data.projetos || [];

  const resultado = await Promise.all(
    projetos.map(async (p) => {
      const detalheRes = await axios.get(
        `${BASE_URL}/catalogo/${p.id}`
      );

      const dados = detalheRes.data;

      const fotos = dados.fotos || [];
      const projetoInfo = dados.projeto || {};

      let dataFormatada = null;

      if (projetoInfo.created_at) {
        const data = new Date(projetoInfo.created_at);

        dataFormatada = new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
          timeZone: 'America/Sao_Paulo'
        }).format(data);
      }

      return {
        ...p,

        thumbnailUrl: fotos[0]
          ? `${BASE_URL}/catalogo/fotos/${fotos[0].id}/visualizar`
          : null,

        fotoPerfil: projetoInfo.usuario_id
          ? `${BASE_URL}/catalogo/usuarios/${projetoInfo.usuario_id}/avatar`
          : null,

        data: dataFormatada
      };
    })
  );

  return { resultado };
}


async function filtrosCatalogo() {
  const api = await axios.get(
    `${BASE_URL}/catalogo/filtros`
  );

  return api.data;
}


async function siteConfig() {
  const api = await axios.get(
    `${BASE_URL}/site-config`
  );

  return api.data;
}


async function consultaProjeto(id) {
  const api = await axios.get(
    `${BASE_URL}/catalogo/${id}`
  );

  const resposta = api.data;

  const fotos = resposta.fotos || [];

  const listaFotos = fotos.map(
    (f) =>
      `${BASE_URL}/catalogo/fotos/${f.id}/visualizar`
  );

  // A URL é apenas montada.
  // O arquivo NÃO é baixado aqui.
  const stlUrl =
    `${BASE_URL}/catalogo/stl/${id}/download`;

  return {
    resposta,
    listaFotos,
    stlUrl
  };
}


async function visualizarFotoPublica(id) {
  const api = await axios.get(
    `${BASE_URL}/catalogo/fotos/${id}/visualizar`
  );

  return api.data;
}


async function avatarPublico(id) {
  const api = await axios.get(
    `${BASE_URL}/catalogo/usuarios/${id}/avatar`
  );

  return api.data;
}


async function verificarStlPublico(id) {
  try {
    const response = await axios.get(`${BASE_URL}/catalogo/stl/${id}/download`, {
      responseType: 'stream'
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function downloadStlPublico(id, res) {
  // Fatora o download para fazer stream do arquivo direto ao cliente
  const response = await axios.get(`${BASE_URL}/catalogo/stl/${id}/download`, {
    responseType: 'stream'
  });

  res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="modelo-${id}.stl"`);
  
  response.data.pipe(res);
}

module.exports = {
  // ...outras funções mantidas
  listaProjetos,
  filtrosCatalogo,
  consultaProjeto,
  visualizarFotoPublica,
  avatarPublico,
  verificarStlPublico,
  downloadStlPublico,
  siteConfig
};


