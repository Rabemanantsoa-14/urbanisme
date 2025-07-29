"use client"

import { TextField, Button, InputAdornment, Typography, Box, Paper } from "@mui/material"
import { useState } from "react"
import { Person, Phone, Email, Lock, Home, Badge } from "@mui/icons-material"
import "./registerPage.css"
import { register } from "../../services/authService";
import { Link } from 'react-router-dom';

export default function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    mot_de_passe: "",
    confirmPassword: "",
    adresse: "",
    cin: "",
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.nom.trim()) newErrors.nom = "Le nom est requis."
    if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis."

    if (!form.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis.";
    } else if (!/^\d{10,}$/.test(form.telephone)) {
      newErrors.telephone = "Le téléphone doit contenir uniquement des chiffres (au moins 10).";
    } else if (/[^\d]/.test(form.telephone)) {
      newErrors.telephone = "Le téléphone ne doit contenir que des chiffres.";
    }

    if (!form.email.trim()) newErrors.email = "L'email est requis."
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) newErrors.email = "Email invalide."

    if (!form.mot_de_passe) newErrors.mot_de_passe = "Le mot de passe est requis."
    else if (form.mot_de_passe.length < 6) newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 6 caractères."

    if (!form.confirmPassword) newErrors.confirmPassword = "Veuillez confirmer le mot de passe."
    else if (form.mot_de_passe !== form.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas."

    if (!form.adresse.trim()) newErrors.adresse = "L'adresse est requise."

    if (!form.cin.trim()) newErrors.cin = "Le CIN est requis."
    else if (!/^\d{12}$/.test(form.cin)) newErrors.cin = "Le CIN doit contenir exactement 12 chiffres."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const data = await register(form);
      alert("Inscription réussie ! Message: " + (data.message || ""));
    } catch (err) {
      alert("Erreur lors de l'inscription : " + (err?.message || err));
    }
  };

  return (
    <Box className="register-container">
      <Paper elevation={24} className="register-paper">
        <form onSubmit={handleSubmit} noValidate>
          <Box className="register-header">
            <Typography variant="h4" className="register-title">
              Créez votre compte
            </Typography>
            <Typography variant="body1" className="register-subtitle">
              Rejoignez-nous dès aujourd'hui
            </Typography>
          </Box>

          {/* Ligne 1 : Nom / Prénom */}
          <Box className="register-row">
            <TextField
              label="Nom"
              name="nom"
              variant="outlined"
              value={form.nom}
              onChange={handleChange}
              error={!!errors.nom}
              helperText={errors.nom}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Prénom"
              name="prenom"
              variant="outlined"
              value={form.prenom}
              onChange={handleChange}
              error={!!errors.prenom}
              helperText={errors.prenom}
              className="register-field"
            />
          </Box>

          {/* Ligne 2 : Téléphone / Email */}
          <Box className="register-row">
            <TextField
              label="Téléphone"
              name="telephone"
              variant="outlined"
              value={form.telephone}
              onChange={handleChange}
              error={!!errors.telephone}
              helperText={errors.telephone}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Ligne 3 : Adresse / CIN */}
          <Box className="register-row">
            <TextField
              label="Adresse"
              name="adresse"
              variant="outlined"
              value={form.adresse}
              onChange={handleChange}
              error={!!errors.adresse}
              helperText={errors.adresse}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="CIN"
              name="cin"
              variant="outlined"
              value={form.cin}
              onChange={handleChange}
              error={!!errors.cin}
              helperText={errors.cin}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Ligne 4 : Mot de passe / Confirmer */}
          <Box className="register-row">
            <TextField
              label="Mot de passe"
              name="mot_de_passe"
              type="password"
              variant="outlined"
              value={form.mot_de_passe}
              onChange={handleChange}
              error={!!errors.mot_de_passe}
              helperText={errors.mot_de_passe}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirmer"
              name="confirmPassword"
              type="password"
              variant="outlined"
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              className="register-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="register-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Boutons */}
          <Button variant="contained" fullWidth type="submit" className="register-submit-btn" sx={{ mt: 2, mb: 2 }}>
            Créer mon compte
          </Button>

          <Button onClick={onSwitch} fullWidth className="register-switch-btn">
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Déjà un compte ? Connectez-vous</Link>
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
