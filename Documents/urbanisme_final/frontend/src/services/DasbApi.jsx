// src/services/api.js
import axios from "axios";

// Création d'une instance Axios
const api = axios.create({
    baseURL: "http://localhost:3000/api", // adapte selon ton backend
    headers: {
        "Content-Type": "application/json",
    },
});

// Fonction d'appel API pour dashboard global (statistiques résumées)
const fetchDashboardStats = async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
};

// Fonctions pour récupérer chaque type de demande
export const getDemandesEnAttente = async () => {
    const response = await api.get("/demandes/en-attente");
    return response.data;
};

export const getDemandesValidees = async () => {
    const response = await api.get("/demandes/validees");
    return response.data;
};

export const getDemandesRefusees = async () => {
    const response = await api.get("/demandes/refusees");
    return response.data;
};

// Fonctions pour récupérer les impôts
export const getImpotsRegles = async () => {
    const response = await api.get("/impots/regles");
    return response.data;
};

export const getImpotsNonRegles = async () => {
    const response = await api.get("/impots/non-regles");
    return response.data;
};

// Export par défaut de la fonction fetchDashboardStats
export default fetchDashboardStats;
