const arquivosService =
  require('../services/arquivosService');


const {
  extractBearerToken
} = require('../utils/header');



async function enviaStl(
  req,
  res
) {

  try {

    const token =
      extractBearerToken(req);

    const id =
      req.params.id;

    const arquivo =
      req.file;


    if (
      !id ||
      !token ||
      !arquivo
    ) {

      return res.status(400).json({
        error:
          'Necessário id, token e arquivo STL'
      });

    }


    const resultado =
      await arquivosService.enviaStl(
        token,
        arquivo,
        id
      );


    return res.json(resultado);


  } catch (error) {

    console.error(error);


    return res.status(401).json({
      error:
        'Erro ao enviar stl'
    });

  }

}



async function baixaStl(
  req,
  res
) {

  try {

    const token =
      extractBearerToken(req);

    const id =
      req.params.id;


    if (
      !id ||
      !token
    ) {

      return res.status(400).json({
        error:
          'Necessário id e token'
      });

    }


    const resultado =
      await arquivosService.baixaStl(
        token,
        id
      );


    return res.json(resultado);


  } catch (error) {

    console.error(error);


    return res.status(401).json({
      error:
        'Erro ao baixar stl'
    });

  }

}



async function excluiStl(
  req,
  res
) {

  try {

    const token =
      extractBearerToken(req);

    const id =
      req.params.id;


    if (
      !id ||
      !token
    ) {

      return res.status(400).json({
        error:
          'Necessário id e token'
      });

    }


    const resultado =
      await arquivosService.excluiStl(
        token,
        id
      );


    return res.json(resultado);


  } catch (error) {

    console.error(error);


    return res.status(401).json({
      error:
        'Erro ao excluir stl'
    });

  }

}



async function buscaFotosImpressao(
  req,
  res
) {

  try {

    const token =
      extractBearerToken(req);

    const id =
      req.params.id;


    if (
      !id ||
      !token
    ) {

      return res.status(400).json({
        error:
          'Necessário id e token'
      });

    }


    const resultado =
      await arquivosService.buscaFotosImpressao(
        token,
        id
      );


    return res.json(resultado);


  } catch (error) {

    console.error(error);


    return res.status(401).json({
      error:
        'Erro ao buscar fotos'
    });

  }

}



async function enviaFotoImpressao(
  req,
  res
) {

  try {

    const token =
      extractBearerToken(req);

    const id =
      req.params.id;

    const arquivo =
      req.file;


    if (
      !id ||
      !token ||
      !arquivo
    ) {

      return res.status(400).json({
        error:
          'Necessário id, token e foto'
      });

    }


    const resultado =
      await arquivosService.enviaFotoImpressao(
        arquivo,
        token,
        id
      );


    return res.json(resultado);


  } catch (error) {

    console.error(error);


    return res.status(401).json({
      error:
        'Erro ao enviar foto'
    });

  }

}



async function visualizaFoto(
  req,
  res
) {

  try {

    const token =
      extractBearerToken(req);

    const id =
      req.params.id;


    if (
      !id ||
      !token
    ) {

      return res.status(400).json({
        error:
          'Necessário id, token e foto'
      });

    }


    const resultado =
      await arquivosService.visualizaFoto(
        token,
        id
      );


    return res.json(resultado);


  } catch (error) {

    console.error(error);


    return res.status(401).json({
      error:
        'Erro ao visualizar foto'
    });

  }

}



module.exports = {

  enviaStl,

  baixaStl,

  excluiStl,

  buscaFotosImpressao,

  enviaFotoImpressao,

  visualizaFoto,

};