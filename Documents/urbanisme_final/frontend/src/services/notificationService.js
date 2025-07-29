import axios from 'axios'

export const getNotifications = async () => {
  const response = await axios.get('http://localhost:3000/notifications')
  return response.data
}
