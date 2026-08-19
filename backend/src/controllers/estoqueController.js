const estoqueService = require('../services/estoqueService');
const { extractBearerToken } = require('../utils/header');

async function opcoes(req, res) {
  try {
    const token = extractBearerToken(req);
    const resultado = await estoqueService.opcoes(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar opções' });
  }
}

async function listaEstoque(req, res) {
  try {
    const token = extractBearerToken(req);
    const { busca, material } = req.query;
    const resultado = await estoqueService.listaEstoque(token, busca, material);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar estoque' });
  }
}

async function criarItem(req, res) {
  try {
    const token = extractBearerToken(req);
    const body = req.body;
    const resultado = await estoqueService.criarItem(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar item' });
  }
}

async function entrada(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    const body = req.body;
    const resultado = await estoqueService.entrada(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao registrar entrada' });
  }
}

async function atualizarItem(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    const body = req.body;
    const resultado = await estoqueService.atualizarItem(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar item' });
  }
}

async function excluirItem(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    await estoqueService.excluirItem(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir item' });
  }
}

module.exports = { opcoes, listaEstoque, criarItem, entrada, atualizarItem, excluirItem };
