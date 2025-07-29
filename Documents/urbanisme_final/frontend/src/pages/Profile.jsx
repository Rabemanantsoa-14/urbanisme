import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import Navbar from '../components/layouts/Navbar'
import SideBar from '../components/layouts/Sidebar'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Utilisateur Premium',
    joinDate: '2023',
    avatarInitials: 'JP'
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save via API
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}>
      {/* SideBar à gauche */}
      <SideBar />

      {/* Partie principale (Navbar + contenu profil) */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar en haut */}
        <Navbar />

        {/* Contenu principal */}
        <Box sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" fontWeight="bold" mb={6}>
              Mon Profil
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {/* Profile Card */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper elevation={3} sx={{ overflow: 'hidden', position: 'relative' }}>
                  <Box
                    sx={{
                      height: 120,
                      background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 128,
                          height: 128,
                          bgcolor: '#e0e7ff',
                          color: '#4f46e5',
                          fontSize: 40,
                          fontWeight: 'bold',
                          border: '4px solid white',
                          boxShadow: 3
                        }}
                      >
                        {user.avatarInitials}
                      </Avatar>

                      <IconButton
                        onClick={() => setIsEditing(!isEditing)}
                        sx={{
                          ml: -4,
                          mt: 12,
                          backgroundColor: 'white',
                          boxShadow: 2,
                          '&:hover': {
                            backgroundColor: '#f3f4f6'
                          }
                        }}
                      >
                        <EditIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ pt: 10, pb: 3, px: 3, textAlign: 'center' }}>
                    {isEditing ? (
                      <TextField
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                        inputProps={{
                          style: {
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: 20
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {user.name}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      Membre depuis {user.joinDate}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<LogoutIcon />}
                      onClick={handleLogout}
                      sx={{ mt: 2 }}
                    >
                      Déconnexion
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* Details Card */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Informations du compte
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box display="flex" flexDirection="column" gap={3}>
                    {/* Email */}
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Email
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          name="email"
                          type="email"
                          size="small"
                          value={user.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ minHeight: '40px' }}>
                          {user.email}
                        </Typography>
                      )}
                    </Box>

                    {/* Rôle */}
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Rôle
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="role"
                          fullWidth
                          size="small"
                          value={user.role}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <Box display="flex" alignItems="center" minHeight="40px">
                          <Typography mr={1}>{user.role}</Typography>
                          {user.role.includes('Premium') && (
                            <Box
                              sx={{
                                background: 'linear-gradient(to right, #facc15, #f59e0b)',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: 999,
                                fontSize: 12,
                                fontWeight: 500
                              }}
                            >
                              PRO
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>

                    {/* Initiales Avatar */}
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Initiales Avatar
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="avatarInitials"
                          value={user.avatarInitials}
                          onChange={handleInputChange}
                          inputProps={{
                            maxLength: 2,
                            style: { textTransform: 'uppercase', textAlign: 'center' }
                          }}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ minHeight: '40px' }}>
                          {user.avatarInitials}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  {isEditing && (
                    <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                      <Button variant="outlined" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button variant="contained" onClick={handleSave}>
                        Enregistrer
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
