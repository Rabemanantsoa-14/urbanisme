// src/components/notification/NotificationList.jsx
import React from 'react'

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications.map((n) => (
        <div key={n.id}>
          <p>{n.title}</p>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationList
