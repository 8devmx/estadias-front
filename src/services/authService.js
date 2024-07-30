//services/authService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8000/auth'; // Cambia esto a la URL de tu backend

// const login = async (mail, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { mail, password });
//     if (response.data.token) {
//       // Guarda el token en localStorage
//       localStorage.setItem('token', response.data.token);
//     }
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export { login };



import axiosInstance from './axiosConfig';

const login = async (mail, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { mail, password });
    if (response.data.token) {
      // Guarda el token en localStorage
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login };
