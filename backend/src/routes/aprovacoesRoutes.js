const express = require('express');
const { listaPendentes, aprovarRejeitar } = require('../controllers/aprovacoesController');

const router = express.Router();

router.get('/pendentes', listaPendentes);
router.patch('/:id', aprovarRejeitar);

module.exports = router;
