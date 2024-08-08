import axios from 'axios';


const API_URL = `${process.env.NEXT_PUBLIC_API_KEY}`; // Cambia esto a la URL de tu backend

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar un interceptor para incluir el token en el encabezado de cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

