const express = require('express');

const {
  //enviaStl,
  baixaStl,
  excluiStl,
  buscaFotosImpressao,
  //enviaFotoImpressao,
  visualizaFoto,
} = require('../controllers/arquivosController');

const router = express.Router();

//router.post('/envia/stl/:id', enviaStl);
//router.post('/envia/stl/:id', enviaStl);
router.get('/baixa/stl/:id', baixaStl);
router.delete('/exclui/stl/:id', excluiStl);
router.get('/busca/fotos/impressao/:id', buscaFotosImpressao);
//router.post('/envia/foto/impressao/:id', enviaFotoImpressao);
router.get('/visualizat/foto/:id', visualizaFoto);

module.exports = router;