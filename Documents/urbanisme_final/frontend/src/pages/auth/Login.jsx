import { TextField, Button, Checkbox, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import "./LoginPage.css";
import { login } from "../../services/authService";
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

export default function LoginForm({ onSwitch, onForgotPassword }) {
  const [form, setForm] = useState({ email: "", mot_de_passe: "" });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await login(form);
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
      }
      alert("Connexion réussie !");
    } catch (err) {
      alert(err);
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validation email OU téléphone
    if (!form.email.trim()) {
      newErrors.email = "L'email ou le téléphone est requis.";
    } else {
      // Vérifie si c'est un email valide
      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email);
      // Vérifie si c'est un téléphone valide (10 chiffres)
      const isPhone = /^[0-9]{10}$/.test(form.email.replace(/\D/g, ''));

      if (!isEmail && !isPhone) {
        newErrors.email = "Format invalide. Entrez un email valide ou un numéro à 10 chiffres.";
      }
    }

    // Validation mot de passe (exigences renforcées)
    if (!form.mot_de_passe.trim()) {
      newErrors.mot_de_passe = "Le mot de passe est requis.";
    } else if (form.mot_de_passe.length < 8) {
      newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 8 caractères.";
    } else if (!/[A-Z]/.test(form.mot_de_passe)) {
      newErrors.mot_de_passe = "Le mot de passe doit contenir au moins une majuscule.";
    } else if (!/[0-9]/.test(form.mot_de_passe)) {
      newErrors.mot_de_passe = "Le mot de passe doit contenir au moins un chiffre.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Box className="login-container">
      <Box className="login-card">
        {/* Icône en haut */}
        <Box className="icon-container">
          <ShieldIcon className="shield-icon" />
        </Box>

        <Typography variant="h1" className="login-title">Urbanisme</Typography>
        <Typography className="login-subtitle">Plateforme de gestion urbaine</Typography>

        <Box component="form" onSubmit={handleSubmit} className="login-form">
          <Box className="form-group">
            <Typography className="input-label">Adresse email ou télephone</Typography>
            <TextField
              name="email"
              fullWidth
              variant="outlined"
              placeholder="votre numero ou email@exemple.com"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              className="email-input"
            />
          </Box>

          <Box className="form-group">
            <Typography className="input-label">Mot de passe</Typography>
            <TextField
              name="mot_de_passe"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              placeholder="Votre mot de passe"
              value={form.mot_de_passe}
              onChange={handleChange}
              error={!!errors.mot_de_passe}
              helperText={errors.mot_de_passe}
              className="password-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className="password-toggle"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className="options-row">
            <Box className="remember-me">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="remember-checkbox"
              />
              <Typography>Se souvenir de moi</Typography>
            </Box>
            <Button
              onClick={onForgotPassword}
              className="forgot-password"
            ><Link to="/forgot-password" style={{ textDecoration: 'none', color: 'inherit' }}>Mot de passe oublié ?</Link>
            </Button>
          </Box>

          <Box className="divider"></Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
          >
            Se connecter
          </Button>

          <Button
            onClick={onSwitch}
            className="create-account"
          ><Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Créer un compte</Link>

          </Button>
        </Box>
      </Box>
    </Box>
  );
}