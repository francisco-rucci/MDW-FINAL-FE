import axios from 'axios';

// Esto lee la URL de tu nuevo archivo .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export default api;