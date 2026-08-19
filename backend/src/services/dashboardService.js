const axios = require('axios');
const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';

async function adminDashboard(token) {
  const api = await axios.get(`${BASE_URL}/dashboard/admin`, { headers: { Authorization: `Bearer ${token}` } });
  return api.data;
}

module.exports = { adminDashboard };
