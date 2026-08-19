const express = require('express');

const {
  listaProjetos,
  filtrosCatalogo,
  consultaProjeto,
  visualizarFotoPublica,
  avatarPublico,
  downloadStlPublico,
} = require('../controllers/catalogoController');

const router = express.Router();

router.get('/', listaProjetos);
router.get('/filtros', filtrosCatalogo);
router.get('/:id', consultaProjeto);
router.get('/fotos/:id/visualizar', visualizarFotoPublica);
router.get('/usuarios/:id/avatar', avatarPublico);
router.get('/stl/:id/download', downloadStlPublico);

module.exports = router;
