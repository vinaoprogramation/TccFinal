const maquinasService = require('../services/maquinasService');

async function opcoes(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const resultado = await maquinasService.opcoes(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar opções' });
  }
}

async function listaMaquinas(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { busca, status } = req.query;
    const resultado = await maquinasService.listaMaquinas(token, busca, status);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar máquinas' });
  }
}

async function criarMaquina(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = req.body;
    const resultado = await maquinasService.criarMaquina(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar máquina' });
  }
}

async function atualizarMaquina(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    const body = req.body;
    const resultado = await maquinasService.atualizarMaquina(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar máquina' });
  }
}

async function excluirMaquina(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    await maquinasService.excluirMaquina(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir máquina' });
  }
}

module.exports = { opcoes, listaMaquinas, criarMaquina, atualizarMaquina, excluirMaquina };
