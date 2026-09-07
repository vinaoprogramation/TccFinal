const express = require('express');

const multer = require('multer');


const {
  enviaStl,
  baixaStl,
  excluiStl,
  buscaFotosImpressao,
  enviaFotoImpressao,
  visualizaFoto,
} = require('../controllers/arquivosController');


const router = express.Router();


const upload = multer({
  storage: multer.memoryStorage()
});


router.post(
  '/envia/stl/:id',
  upload.single('stl'),
  enviaStl
);


router.get(
  '/baixa/stl/:id',
  baixaStl
);


router.delete(
  '/exclui/stl/:id',
  excluiStl
);


router.get(
  '/busca/fotos/impressao/:id',
  buscaFotosImpressao
);


router.post(
  '/envia/foto/impressao/:id',
  upload.single('foto'),
  enviaFotoImpressao
);


router.get(
  '/visualizat/foto/:id',
  visualizaFoto
);


module.exports = router;