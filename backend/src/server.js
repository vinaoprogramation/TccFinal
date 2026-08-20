require('dotenv').config();
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:8081', 'http://10.0.2.2:8081', 'https://glorious-space-garbanzo-g47rjx6vx7px2v4r6-8081.app.github.dev']
}

require('dnscache')({
  enable: true,
  ttl: 300,       // Mantém o endereço salvo por 5 minutos
  cachesize: 1000 // Capacidade do cache
});

const app = require('./app');
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});