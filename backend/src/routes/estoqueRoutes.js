const express = require('express');
const { opcoes, listaEstoque, criarItem, entrada, atualizarItem, excluirItem } = require('../controllers/estoqueController');

const router = express.Router();

router.get('/opcoes', opcoes);
router.get('/', listaEstoque);
router.post('/', criarItem);
router.post('/:id/entrada', entrada);
router.put('/:id', atualizarItem);
router.delete('/:id', excluirItem);

module.exports = router;
