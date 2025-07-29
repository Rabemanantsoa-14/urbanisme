import axios from "axios";

export const fetchDemandes = async () => {
    try {
        const response = await axios.get("http://localhost:3000/permis");
        console.log("Données reçues :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        throw error;
    }
};
