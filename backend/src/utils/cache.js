const NodeCache = require('node-cache');

const projetoCache = new NodeCache({ stdTTL: 300 });

module.exports = projetoCache;