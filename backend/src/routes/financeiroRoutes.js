const express = require('express');
const { listaFinanceiro, criarRecebimento, dashboardFinanceiro, pendentes, atualizarRecebimento, excluirRecebimento } = require('../controllers/financeiroController');

const router = express.Router();

router.get('/', listaFinanceiro);
router.post('/', criarRecebimento);
router.get('/dashboard', dashboardFinanceiro);
router.get('/pendentes', pendentes);
router.put('/:id', atualizarRecebimento);
router.delete('/:id', excluirRecebimento);

module.exports = router;
