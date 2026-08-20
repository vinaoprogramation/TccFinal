const axios = require('axios');
const sharp = require('sharp');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

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