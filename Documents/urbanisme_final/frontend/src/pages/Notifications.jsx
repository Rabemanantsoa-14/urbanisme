import React from 'react'
import { Bell } from 'lucide-react'
import NotificationList from '../components/notification/NotificationList'
import { useNotifications } from '../hooks/useNotifications'
import Navbar from '../components/layouts/Navbar'
import SideBar from '../components/layouts/Sidebar'
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material'

const Notifications = () => {
  const { notifications, loading } = useNotifications()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <Box sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
          <Container maxWidth="md">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color="text.primary"
                display="flex"
                alignItems="center"
              >
                <Bell size={32} style={{ color: '#4f46e5', marginRight: 12 }} />
                Notifications
              </Typography>
            </Box>

            <Paper
              elevation={1}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                p: 2,
              }}
            >
              {loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={6}
                >
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                <NotificationList notifications={notifications} />
              )}
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Notifications
