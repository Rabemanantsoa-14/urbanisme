import { useEffect, useState } from 'react'
import { getNotifications } from '../services/notificationService'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch (err) {
        console.error('Erreur notifications :', err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { notifications, loading }
}
