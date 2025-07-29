// src/components/profile/ProfileCard.jsx
import React from 'react';

export default function ProfileCard({ user, isEditing, setIsEditing, handleLogout, handleInputChange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24 flex items-center justify-center">
        <div className="relative -mb-16">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold shadow-lg">
            {user.avatarInitials}
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          >
            ✎
          </button>
        </div>
      </div>

      <div className="pt-20 pb-6 px-6 text-center">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="text-xl font-semibold text-gray-800 mb-1 w-full text-center border-b border-gray-200 focus:border-indigo-500 focus:outline-none"
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{user.name}</h2>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
