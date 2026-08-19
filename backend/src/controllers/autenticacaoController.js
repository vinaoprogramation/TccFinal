const autenticacaoService = require('../services/autenticacaoService');

async function login(req, res) {
  console.log("Início do login")

  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: 'Usuário e senha são obrigatórios'
      });
    }

    const resultado = await autenticacaoService.login(email, senha);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao fazer login'
    });
  }
};



async function registrar(req, res) {

  try {
    const { nome, email, matricula, senha, perfil, curso } = req.body;

    const { extractBearerToken } = require('../utils/header');
    const token = extractBearerToken(req);

    if (!nome || !email || !matricula || !senha || !perfil || !curso) {
      return res.status(400).json({
        error: 'Insira todos os parâmetros'
      });
    }

    const resultado = await autenticacaoService.registrar(nome, email, matricula, senha, perfil, curso, token);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao registrar'
    });
  }
}

async function consultarEu(req, res) {

  try {

    if (!token) {
      return res.status(400).json({
        error: 'Token não existe'
      });
    }

    const resultado = await autenticacaoService.consultarEu(token);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Usuário já existe'
    });
  }
}


module.exports = {
  login,
  registrar,
  consultarEu,
};
