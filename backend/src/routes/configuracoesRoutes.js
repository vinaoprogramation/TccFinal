const express = require('express');
const { opcoes, listaMateriais, criarMaterial, atualizarMaterial, excluirMaterial, listaCategorias, criarCategoria, atualizarCategoria, excluirCategoria, siteGet, sitePut } = require('../controllers/configuracoesController');

const router = express.Router();

router.get('/opcoes', opcoes);
router.get('/materiais', listaMateriais);
router.post('/materiais', criarMaterial);
router.put('/materiais/:id', atualizarMaterial);
router.delete('/materiais/:id', excluirMaterial);

router.get('/categorias', listaCategorias);
router.post('/categorias', criarCategoria);
router.put('/categorias/:id', atualizarCategoria);
router.delete('/categorias/:id', excluirCategoria);

router.get('/site', siteGet);
router.put('/site', sitePut);

module.exports = router;
