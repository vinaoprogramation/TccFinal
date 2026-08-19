const financeiroService = require('../services/financeiroService');
const { extractBearerToken } = require('../utils/header');

async function listaFinanceiro(req, res) {
  try {
    const token = extractBearerToken(req);
    const { busca, categoria, forma_pagamento } = req.query;
    const resultado = await financeiroService.listaFinanceiro(token, busca, categoria, forma_pagamento);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar financeiro' });
  }
}

async function criarRecebimento(req, res) {
  try {
    const token = extractBearerToken(req);
    const body = req.body;
    const resultado = await financeiroService.criarRecebimento(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar recebimento' });
  }
}

async function dashboardFinanceiro(req, res) {
  try {
    const token = extractBearerToken(req);
    const resultado = await financeiroService.dashboardFinanceiro(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter dashboard financeiro' });
  }
}

async function pendentes(req, res) {
  try {
    const token = extractBearerToken(req);
    const resultado = await financeiroService.pendentes(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar pendentes' });
  }
}

async function atualizarRecebimento(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    const body = req.body;
    const resultado = await financeiroService.atualizarRecebimento(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar recebimento' });
  }
}

async function excluirRecebimento(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    await financeiroService.excluirRecebimento(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir recebimento' });
  }
}

module.exports = { listaFinanceiro, criarRecebimento, dashboardFinanceiro, pendentes, atualizarRecebimento, excluirRecebimento };
