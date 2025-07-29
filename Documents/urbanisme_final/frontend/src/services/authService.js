import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // adjust based on your NestJS base URL

// Login request (already exists)
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// ✅ Register request (NEW)
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/singing`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erreur lors de l’inscription.';
  }
};

// ✅ Send forgot password email with code
export const sendResetCode = async (email) => {
  const response = await axios.post(`${API_URL}/send-code`, { email });
  return response.data;
};

// ✅ Reset password with verification code
export const resetPassword = async ({ email, code, mot_de_passe}) => {
  const response = await axios.post(`${API_URL}/reset-password`, {
    email,
    code,
    mot_de_passe
  });
  return response.data;
};
