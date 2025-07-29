// src/components/profile/ProfileDetails.jsx
import React from 'react';

export default function ProfileDetails({ user, isEditing, handleInputChange, setIsEditing, handleSave }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Informations du compte</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-200 rounded-lg"
            />
          ) : (
            <p className="text-gray-800">{user.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Rôle</label>
          {isEditing ? (
            <select
              name="role"
              value={user.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-200 rounded-lg"
            >
              <option>Client</option>
              <option>Administrateur</option>
            </select>
          ) : (
            <p className="text-gray-800">{user.role}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Initiales Avatar</label>
          {isEditing ? (
            <input
              type="text"
              name="avatarInitials"
              value={user.avatarInitials}
              onChange={handleInputChange}
              maxLength="2"
              className="w-16 p-2 border border-gray-200 rounded-lg text-center uppercase"
            />
          ) : (
            <p className="text-gray-800">{user.avatarInitials}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}
