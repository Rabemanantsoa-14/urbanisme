
import axios from 'axios';

export const getUserProfile = async () => {
  const response = await axios.get('/api/profile');
  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await axios.put('/api/profile', data);
  return response.data;
};
