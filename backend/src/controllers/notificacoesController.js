const notificacoesService = require('../services/notificacoesService');

async function listaNotificacoes(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const resultado = await notificacoesService.listaNotificacoes(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar notificações' });
  }
}

async function enviarMensagem(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = req.body;
    const resultado = await notificacoesService.enviarMensagem(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
}

async function marcarLida(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    await notificacoesService.marcarLida(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao marcar lida' });
  }
}

async function excluirLidas(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    await notificacoesService.excluirLidas(token);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir lidas' });
  }
}

async function excluirNotificacao(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    await notificacoesService.excluirNotificacao(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir notificação' });
  }
}

module.exports = { listaNotificacoes, enviarMensagem, marcarLida, excluirLidas, excluirNotificacao };
