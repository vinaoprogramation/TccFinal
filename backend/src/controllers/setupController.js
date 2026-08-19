const setupService = require('../services/setupService');

async function statusSetup(req, res) {
  try {
    const resultado = await setupService.statusSetup();
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar status do setup' });
  }
}

async function criarSetup(req, res) {
  try {
    const { nome, email, senha, site_nome, logo_url, cor_primaria, cor_secundaria } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Parâmetros faltosos' });
    }

    const resultado = await setupService.criarSetup(nome, email, senha, site_nome, logo_url, cor_primaria, cor_secundaria);

    return res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar setup' });
  }
}

module.exports = {
  statusSetup,
  criarSetup,
};
