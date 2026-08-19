const relatoriosService = require('../services/relatoriosService');

async function consultaRelatorios(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { tipo, referencia } = req.query;
    const resultado = await relatoriosService.consultaRelatorios(token, tipo, referencia);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar relatórios' });
  }
}

module.exports = { consultaRelatorios };
