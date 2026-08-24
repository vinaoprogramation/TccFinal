const impressoesService = require('../services/impressoesService');
const { extractBearerToken } = require('../utils/header');

async function buscaImpressoes(req, res) {
  try {

    const token = extractBearerToken(req);

    if (!token) {
      return res.status(400).json({
        error: 'Token não existe'
      });
    }

    const resultado = await impressoesService.buscaImpressoes(token);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};




async function buscaImpressao(req, res) {
  try {

    const id = req.params.id;

    const token = extractBearerToken(req);

    if (!token || !id) {
      return res.status(400).json({
        error: 'Id ou Token não existe'
      });
    }

    const resultado = await impressoesService.buscaImpressao(token, id);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};


async function alteraImpressao(req, res) {
  try {

    const id = req.params.id;

    const { nome_impressao, categoria, tempo_impressao, maquina_id, filamentos, material, cor_filamento, gramas, comprador, objetivo, status } = req.body

    const token = extractBearerToken(req);

    if (!id || !token || !nome_impressao || !categoria || !tempo_impressao || !maquina_id || !filamentos || !material || !cor_filamento || !gramas || !comprador || !objetivo || !status) {
      return res.status(400).json({
        error: 'Parâmetros faltosos'
      });
    }

    const resultado = await impressoesService.alteraImpressao(nome_impressao, categoria, tempo_impressao, maquina_id, filamentos, material, cor_filamento, gramas, comprador, objetivo, status, token, id);


    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};





async function buscaFalhas(req, res) {
  try {

    const token = extractBearerToken(req);

    if (!token) {
      return res.status(400).json({
        error: 'Token não existe'
      });
    }

    const resultado = await impressoesService.buscaFalhas(token);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};



async function buscaFalhaFoto(req, res) {
  try {

    const id = req.params.id;
    const token = extractBearerToken(req);

    if (!token || !id) {
      return res.status(400).json({
        error: 'Token ou id não existe'
      });
    }

    const resultado = await impressoesService.buscaFalhaFoto(token, id);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};




async function cadastrarImpressao(req, res) {
  try {

    const { nome_impressao, categoria, tempo_impressao, maquina_id, filamentos, material, cor_filamento, gramas, comprador, objetivo, status } = req.body
    console.log(req.body)
    const token = extractBearerToken(req);

    if (!token || !nome_impressao || !categoria || !tempo_impressao || !maquina_id || !filamentos || !material || !cor_filamento || !gramas) {
      return res.status(400).json({
        error: 'Parâmetros faltosos'
      });
    }

    const resultado = await impressoesService.cadastrarImpressao(nome_impressao, categoria, tempo_impressao, maquina_id, filamentos, material, cor_filamento, gramas, comprador, objetivo, status, token);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};




async function deletarImpressao(req, res) {
  try {
    const id = req.params.id;

    const token = extractBearerToken(req);

    if (!token || !id) {
      return res.status(400).json({
        error: 'Token e ID Inexistente'
      });
    }

    const resultado = await impressoesService.deletarImpressao(token, id);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};



async function alterarStatus(req, res) {
  try {
    const id = req.params.id;

    const {status, comprador, objetivo} = req.body;

    const token = extractBearerToken(req);

    if (!token || !id || !status || !comprador || !objetivo) {
      return res.status(400).json({
        error: 'Parâmetros faltosos'
      });
    }

    const resultado = await impressoesService.alterarStatus( status, comprador, objetivo, token, id);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};




async function alterarFalha(req, res) {
  try {
    const id = req.params.id;

    const foto = req.file? req.file.buffer : null;

    console.log(foto)

    const {percentual_falha, consumos, observacao} = req.body;

    const token = extractBearerToken(req);

    if (!token || !id || !foto || !percentual_falha || !consumos) {
      return res.status(400).json({
        error: 'Parâmetros faltosos'
      });
    }

    const resultado = await impressoesService.alterarFalha( foto, percentual_falha, consumos, observacao, token, id);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro na busca'
    });
  }
};




module.exports = {
  buscaImpressoes,
  buscaImpressao,
  alteraImpressao,
  buscaFalhas,
  cadastrarImpressao,
  deletarImpressao,
  alterarStatus,
  alterarFalha,
  buscaFalhaFoto,
};
