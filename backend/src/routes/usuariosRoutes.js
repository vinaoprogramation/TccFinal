const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { perfil, atualizarPerfil, enviaAvatar, listaUsuarios, criarUsuario, atualizarUsuario, excluirUsuario } = require('../controllers/usuariosController');

const router = express.Router();

router.get('/perfil', perfil);
router.put('/perfil', atualizarPerfil);
router.post('/avatar', upload.single('foto'), enviaAvatar);router.get('/', listaUsuarios);
router.post('/', criarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', excluirUsuario);

module.exports = router;
