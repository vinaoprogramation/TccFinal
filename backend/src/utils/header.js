function extractBearerToken(req) {
  const authorization = req && req.headers && req.headers.authorization;
  if (!authorization) return null;
  const parts = authorization.split(' ');
  if (parts.length !== 2) return null;
  const [type, token] = parts;
  if (type !== 'Bearer' || !token) return null;
  return token;
}

module.exports = { extractBearerToken };
