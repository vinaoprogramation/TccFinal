const aprovacoesService = require('../services/aprovacoesService');
const { extractBearerToken } = require('../utils/header');

async function listaPendentes(req, res) {
  try {
    const token = extractBearerToken(req);
    if (!token) return res.status(400).json({ error: 'Token ausente' });
    const resultado = await aprovacoesService.listaPendentes(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar pendentes' });
  }
}

async function aprovarRejeitar(req, res) {
  try {
    const token = extractBearerToken(req);
    const id = req.params.id;
    const body = req.body;

    console.log(id, body)
    if (!token || !id) return res.status(400).json({ error: 'Parâmetros faltosos' });
    const resultado = await aprovacoesService.aprovarRejeitar(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar aprovação' });
  }
}

module.exports = { listaPendentes, aprovarRejeitar };
