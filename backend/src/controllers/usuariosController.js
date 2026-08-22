const usuariosService = require('../services/usuariosService');

async function perfil(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const resultado = await usuariosService.perfil(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter perfil' });
  }
}

async function atualizarPerfil(req, res) {
  console.log("aqui")
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = req.body;
    console.log(body)
    const resultado = await usuariosService.atualizarPerfil(token, body);
    console.log(resultado)
    return res.json(resultado);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
}

async function enviaAvatar(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = req.body;
    const resultado = await usuariosService.enviaAvatar(token, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao enviar avatar' });
  }
}

async function listaUsuarios(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const resultado = await usuariosService.listaUsuarios(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

async function criarUsuario(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const body = req.body;
    const resultado = await usuariosService.criarUsuario(token, body);
    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    const body = req.body;
    const resultado = await usuariosService.atualizarUsuario(token, id, body);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

async function excluirUsuario(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const id = req.params.id;
    await usuariosService.excluirUsuario(token, id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
}

module.exports = { perfil, atualizarPerfil, enviaAvatar, listaUsuarios, criarUsuario, atualizarUsuario, excluirUsuario };
