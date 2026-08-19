const express = require('express');
const { opcoes, listaMaquinas, criarMaquina, atualizarMaquina, excluirMaquina } = require('../controllers/maquinasController');

const router = express.Router();

router.get('/opcoes', opcoes);
router.get('/', listaMaquinas);
router.post('/', criarMaquina);
router.put('/:id', atualizarMaquina);
router.delete('/:id', excluirMaquina);

module.exports = router;
