import axios from 'axios';

export const DEFAULT_ERROR = 'Erro ao se conectar com o servidor.';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api',
  withCredentials: true,
});

export default api;