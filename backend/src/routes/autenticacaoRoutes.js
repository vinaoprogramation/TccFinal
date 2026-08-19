const express = require('express');

const {
    login,
    registrar,
    consultarEu,
} = require('../controllers/autenticacaoController');

const router = express.Router();

router.post('/login', login);
router.post('/registrar', registrar);
router.get('/consultar/eu', consultarEu);

module.exports = router;