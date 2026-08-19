const configuracoesService = require('../services/configuracoesService');
const { extractBearerToken } = require('../utils/header');

async function opcoes(req, res) {
  try {
    const token = extractBearerToken(req);
    const resultado = await configuracoesService.opcoes(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar opções' });
  }
}

async function listaMateriais(req, res) {
  try {
    const token = extractBearerToken(req);
    const resultado = await configuracoesService.listaMateriais(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar materiais' });
  }
}

async function criarMaterial(req, res) {
  try {
    const token = extractBearerToken(req);
    const body = req.body;
    const resultado = await configuracoesService.criarMaterial(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar material' });
  }
}

async function atualizarMaterial(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    const body = req.body;
    const resultado = await configuracoesService.atualizarMaterial(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar material' });
  }
}

async function excluirMaterial(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    await configuracoesService.excluirMaterial(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir material' });
  }
}

async function listaCategorias(req, res) {
  try {
    const token = extractBearerToken(req);
    const resultado = await configuracoesService.listaCategorias(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar categorias' });
  }
}

async function criarCategoria(req, res) {
  try {
    const token = extractBearerToken(req);
    const body = req.body;
    const resultado = await configuracoesService.criarCategoria(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar categoria' });
  }
}

async function atualizarCategoria(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    const body = req.body;
    const resultado = await configuracoesService.atualizarCategoria(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
}

async function excluirCategoria(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    await configuracoesService.excluirCategoria(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
}

async function siteGet(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const resultado = await configuracoesService.siteGet(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar configuração do site' });
  }
}

async function sitePut(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = req.body;
    const resultado = await configuracoesService.sitePut(token, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao salvar configuração do site' });
  }
}

module.exports = { opcoes, listaMateriais, criarMaterial, atualizarMaterial, excluirMaterial, listaCategorias, criarCategoria, atualizarCategoria, excluirCategoria, siteGet, sitePut };
