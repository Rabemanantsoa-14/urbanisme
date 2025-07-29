import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, VpnKey, Visibility, VisibilityOff } from "@mui/icons-material";
import { sendResetCode, resetPassword } from "../../services/authService";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [receivedCode, setReceivedCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // États pour afficher/masquer les mots de passe
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Format d'email invalide.");
      return;
    }

    setLoading(true);

    try {
      const res = await sendResetCode(email);
      const { code } = res;
      setReceivedCode(code || "");
      setCodeSent(true);
      setSuccess(
        res.message || `Un code de vérification a été envoyé à ${email}`
      );
      startResendTimer();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Erreur lors de l'envoi du code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!inputCode.trim()) {
      setError("Veuillez entrer le code de vérification.");
      return;
    }

    if (mot_de_passe.length < 8) {
      setError("Le nouveau mot de passe doit faire au moins 8 caractères.");
      return;
    }

    if (mot_de_passe !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email,
        code: inputCode,
        mot_de_passe,
      });

      setSuccess("Mot de passe réinitialisé avec succès !");
      setTimeout(() => onBackToLogin(), 2000);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Erreur lors de la réinitialisation."
      );
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendDisabled(true);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const customTextFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(197, 192, 192)", // Bordure gris foncé
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(133, 133, 133, 0.9)", // Label gris foncé
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          maxWidth: 450,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Mot de passe oublié
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!codeSent ? (
          <form onSubmit={handleSendCode}>
            <TextField
              label="Adresse email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "action.active", mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={customTextFieldStyles}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className="login-button"
              sx={{
                py: 1.5,
                mb: 2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Envoyer le code"}
            </Button>

            <Button
              onClick={onBackToLogin}
              fullWidth
              sx={{
                py: 1.5,
                color: "text.secondary",
              }}
            ><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Retour à la connexion</Link>

            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <TextField
              label="Code de vérification"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey sx={{ color: "action.active", mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={customTextFieldStyles}
            />

            {/* Nouveau mot de passe avec icône œil */}
            <TextField
              label="Nouveau mot de passe"
              type={showNewPassword ? "text" : "password"}
              value={mot_de_passe}
              onChange={(e) => setMot_de_passe(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "action.active", mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                      aria-label={
                        showNewPassword
                          ? "Masquer mot de passe"
                          : "Afficher mot de passe"
                      }
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={customTextFieldStyles}
            />

            {/* Confirmer le mot de passe avec icône œil */}
            <TextField
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "action.active", mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      aria-label={
                        showConfirmPassword
                          ? "Masquer mot de passe"
                          : "Afficher mot de passe"
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={customTextFieldStyles}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 1,
                backgroundImage: "linear-gradient(to right, #256c49, #164b4d)",
                color: "#fff",
                "&:hover": {
                  backgroundImage: "linear-gradient(to right, #164b4d, #256c49)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Réinitialiser"
              )}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Button
                onClick={() => {
                  setCodeSent(false);
                  setError("");
                }}
                disabled={resendDisabled}
                sx={{
                  color: resendDisabled ? "text.disabled" : "primary.main",
                }}
              >
                {resendDisabled ? `Renvoyer (${resendTimer}s)` : "Renvoyer le code"}
              </Button>

              <Button onClick={onBackToLogin} sx={{ color: "text.secondary" }}>
                Retour
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </div>
  );
}
