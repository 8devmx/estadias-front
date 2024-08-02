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
