const express = require('express');

const { statusSetup, criarSetup } = require('../controllers/setupController');

const router = express.Router();

router.get('/status', statusSetup);
router.post('/', criarSetup);

module.exports = router;
