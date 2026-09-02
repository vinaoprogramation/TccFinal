const express = require('express');

const {
  listaProjetos,
  filtrosCatalogo,
  consultaProjeto,
  visualizarFotoPublica,
  avatarPublico,
  downloadStlPublico,
  verificarStlPublico,
  siteConfig,
} = require('../controllers/catalogoController');

const router = express.Router();

router.get('/', listaProjetos);
router.get('/site-config', siteConfig);
router.get('/filtros', filtrosCatalogo);
router.get('/:id', consultaProjeto);
router.get('/fotos/:id/visualizar', visualizarFotoPublica);
router.get('/usuarios/:id/avatar', avatarPublico);
router.get('/stl/:id/download', downloadStlPublico);
router.get('/stl/:id/verificar', verificarStlPublico);

module.exports = router;
