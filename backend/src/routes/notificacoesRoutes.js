const express = require('express');
const { listaNotificacoes, enviarMensagem, marcarLida, excluirLidas, excluirNotificacao } = require('../controllers/notificacoesController');

const router = express.Router();

router.get('/', listaNotificacoes);
router.post('/mensagens', enviarMensagem);
router.patch('/:id/lida', marcarLida);
router.delete('/lidas', excluirLidas);
router.delete('/:id', excluirNotificacao);

module.exports = router;
