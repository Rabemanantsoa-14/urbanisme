import React from 'react'
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react'
import { formatDate } from '../utils/formatDate'

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case 'error':
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <Info className="h-5 w-5 text-blue-500" />
  }
}

const NotificationItem = ({ notification }) => (
  <div
    className={`relative flex items-start gap-3 px-4 py-3 transition-colors duration-200 rounded-lg cursor-pointer
      ${!notification.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-100'}`}
  >
    {/* Icône */}
    <div className="pt-1">{getIcon(notification.type)}</div>

    {/* Contenu */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-0.5">
        <p className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
          {notification.title}
        </p>
        <time className="text-xs text-gray-400 whitespace-nowrap">
          {formatDate(notification.date)}
        </time>
      </div>
      <p className="text-sm text-gray-600 leading-snug">{notification.content}</p>
    </div>

    {/* Pastille de non-lu */}
    {!notification.read && (
      <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-blue-600" />
    )}
  </div>
)

export default NotificationItem
