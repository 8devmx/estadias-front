// // services/axiosConfig.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8000';

// // Crea una instancia de Axios
// const axiosInstance = axios.create({
//   baseURL: API_URL
// });

// // Configura un interceptor de solicitud para agregar el token JWT
// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



// services/axiosInstance.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Cambia esto a la URL de tu backend

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

