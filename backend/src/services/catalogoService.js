const axios = require('axios');
const sharp = require('sharp');
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

      const detalheRes = await axios.get(`${BASE_URL}/catalogo/${p.id}`);
      const dados = detalheRes.data;
      
      const fotos = dados.fotos || [];
      const projetoInfo = dados.projeto || {};
      
      let thumbnailBase64 = null;
      if (fotos[0]) {
        const buffer = await gerarThumbnail(fotos[0].id);
        thumbnailBase64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      }

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
        thumbnailUrl: thumbnailBase64,
        fotoPerfil: projetoInfo.usuario_id ? `${BASE_URL}/catalogo/usuarios/${projetoInfo.usuario_id}/avatar` : null,
        data: dataFormatada
      };
    })
  );

  return { resultado };
}


async function baixarImagem(id) {

  const response = await axios.get(
    `${BASE_URL}/catalogo/fotos/${id}/visualizar`,
    {
      responseType: 'arraybuffer'
    }
  );
  return response.data;
}


async function gerarThumbnail(id) {

  const imagem = await baixarImagem(id);

  const buffer = await sharp(imagem)
    .rotate()
    .resize({
      width: 600,
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({
      quality: 55,
      mozjpeg: true,
      chromaSubsampling: '4:4:4'
    })
    .toBuffer();

  return buffer;
}


async function obterMetadata(id) {

  const imagem = await baixarImagem(id);

  return await sharp(imagem).metadata();
}


module.exports = {
  gerarThumbnail,
  obterMetadata
};



async function filtrosCatalogo() {
  const api = await axios.get(`${BASE_URL}/catalogo/filtros`);
  return api.data;
}


async function siteConfig() {
  const api = await axios.get(`${BASE_URL}/site-config`);
  return api.data;
}

async function consultaProjeto(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/${id}`);
  const resposta = api.data
  const fotos = api.data.fotos;

  const listaFotos = await fotos.map(f => 
    `${BASE_URL}/catalogo/fotos/${f.id}/visualizar`);
    

  return ({resposta, listaFotos});
}

async function visualizarFotoPublica(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/fotos/${id}/visualizar`);
  return api.data;
}

async function avatarPublico(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/usuarios/${id}/avatar`);
  return api.data;
}

async function downloadStlPublico(id) {
  const api = await axios.get(`${BASE_URL}/catalogo/stl/${id}/download`);
  return api.data;
}

module.exports = {
  listaProjetos,
  filtrosCatalogo,
  consultaProjeto,
  visualizarFotoPublica,
  avatarPublico,
  downloadStlPublico,
  siteConfig,
};
