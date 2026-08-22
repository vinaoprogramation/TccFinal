const dashboardService = require('../services/dashboardService');
const autenticacaoService = require('../services/autenticacaoService')
const { extractBearerToken } = require('../utils/header');

async function adminDashboard(req, res) {
  try {
    const token = extractBearerToken(req);
    if (!token) return res.status(400).json({ error: 'Token ausente' });

    const verificaAdmin = await autenticacaoService.consultarEu(token);

    const usuario = verificaAdmin.response.usuario.perfil;
    if(usuario != 'ADMIN'){
      return res.json({
        mensagem: "Usuário não é administrador"
      })
    }

    const resultado = await dashboardService.adminDashboard(token);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar dashboard' });
  }
}

module.exports = { adminDashboard };
