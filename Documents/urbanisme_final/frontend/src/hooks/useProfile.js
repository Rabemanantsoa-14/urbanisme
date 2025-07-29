// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/profileService';

export default function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (updatedUser) => {
    try {
      const data = await updateUserProfile(updatedUser);
      setUser(data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { user, setUser, loading, saveProfile };
}
