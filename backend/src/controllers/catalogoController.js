const catalogoService = require('../services/catalogoService');
const projetoCache = require('../utils/cache');

async function listaProjetos(req, res) {
  try {
    const { busca, categoria, material, aluno } = req.query;

    const cacheKey = `projetos_${JSON.stringify({ busca, categoria, material, aluno })}`;

    const dadosEmCache = projetoCache.get(cacheKey);

    if(dadosEmCache){
      return res.json(dadosEmCache);
    }

    const resultado = await catalogoService.listaProjetos(busca, categoria, material, aluno);

    projetoCache.set(cacheKey, resultado);

    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar projetos' });
  }
}

async function filtrosCatalogo(req, res) {
  try {
    const resultado = await catalogoService.filtrosCatalogo();
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar filtros' });
  }
}

async function consultaProjeto(req, res) {
  try {
    console.log(req.params.id)
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Id ausente' });
    const resultado = await catalogoService.consultaProjeto(id);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar projeto' });
  }
}

async function visualizarFotoPublica(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Id ausente' });
    const resultado = await catalogoService.visualizarFotoPublica(id);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao visualizar foto' });
  }
}

async function avatarPublico(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Id ausente' });
    const resultado = await catalogoService.avatarPublico(id);
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar avatar' });
  }
}

async function siteConfig(req, res) {
  try {
    const resultado = await catalogoService.siteConfig();
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar site-config' });
  }
}

async function verificarStlPublico(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Id ausente' });
    const disponivel = await catalogoService.verificarStlPublico(id);
    return res.json({ disponivel });
  } catch (error) {
    return res.json({ disponivel: false });
  }
}

async function downloadStlPublico(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Id ausente' });
    
    // Passa o objeto `res` para fazer o pipe da imagem/arquivo
    await catalogoService.downloadStlPublico(id, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao baixar STL' });
  }
}

module.exports = {
  // ...outras funções mantidas
  listaProjetos,
  filtrosCatalogo,
  consultaProjeto,
  visualizarFotoPublica,
  avatarPublico,
  verificarStlPublico,
  downloadStlPublico,
  siteConfig,
};