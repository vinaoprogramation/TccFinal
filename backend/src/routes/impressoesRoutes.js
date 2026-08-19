const express = require('express');
const multer = require('multer');
const upload = multer()

const {
    buscaImpressoes,
    buscaImpressao,
    alteraImpressao,
    buscaFalhas,
    cadastrarImpressao,
    deletarImpressao,
    alterarStatus,
    alterarFalha,
    buscaFalhaFoto,
} = require('../controllers/impressoesController');

const router = express.Router();

router.get('/busca', buscaImpressoes);
router.get('/busca/:id', buscaImpressao);
router.put('/altera/:id', alteraImpressao);
router.get('/busca/falhas', buscaFalhas);
router.get('/busca/falha/:id/foto', buscaFalhaFoto);
router.post('/cadastrar', cadastrarImpressao);
router.delete('/deletar/:id', deletarImpressao);
router.patch('/altera/status/:id', alterarStatus);
router.patch('/altera/falha/:id', upload.single('foto'), alterarFalha);

module.exports = router;

