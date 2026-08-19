const express = require('express');
const { consultaRelatorios } = require('../controllers/relatoriosController');

const router = express.Router();

router.get('/', consultaRelatorios);

module.exports = router;
