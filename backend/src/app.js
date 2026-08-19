const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: [
    'http://localhost:8081', 
    'http://10.0.2.2:8081',
    'http://localhost:19006'
    ]
}

const autenticacaoRoutes = require('./routes/autenticacaoRoutes');

const impressoesRoutes = require('./routes/impressoesRoutes');

const arquivosRoutes = require('./routes/arquivosRoutes');
const setupRoutes = require('./routes/setupRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aprovacoesRoutes = require('./routes/aprovacoesRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const maquinasRoutes = require('./routes/maquinasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const configuracoesRoutes = require('./routes/configuracoesRoutes');
const notificacoesRoutes = require('./routes/notificacoesRoutes');
const relatoriosRoutes = require('./routes/relatoriosRoutes');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/autenticacao', autenticacaoRoutes);
app.use('/impressoes', impressoesRoutes);
app.use('/arquivos', arquivosRoutes);
app.use('/setup', setupRoutes);
app.use('/catalogo', catalogoRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/aprovacoes', aprovacoesRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/maquinas', maquinasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/configuracoes', configuracoesRoutes);
app.use('/notificacoes', notificacoesRoutes);
app.use('/relatorios', relatoriosRoutes);

module.exports = app;
