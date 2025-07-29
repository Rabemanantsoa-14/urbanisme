import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    LinearProgress,
    useTheme,
} from '@mui/material';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import fetchDashboardStats from '../services/DasbApi';
import MapComponents from './MapComponents';

import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Dashboard = () => {
    const [stats, setStats] = useState({
        totalDemandes: 0,
        impotsRegles: 0,
        impotsNonRegles: 0,
        demandesEnAttente: 0,
        demandesValidees: 0,
        demandesRefusees: 0,
    });

    const theme = useTheme();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await fetchDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques :', error);
            }
        };

        fetchStats();
    }, []);

    const calculatePercentage = (part, total) => {
        return total > 0 ? Math.round((part / total) * 100) : 0;
    };

    const StatCard = ({ label, value, percent, color, total }) => (
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography variant="h5" fontWeight="bold" color={color}>{value}</Typography>
                <Typography variant="body2" color={color}>{percent}%</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                    height: 8,
                    borderRadius: 5,
                    mt: 2,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': { backgroundColor: color },
                }}
            />
            {typeof total === 'number' && (
                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                    {value} sur {total}
                </Typography>
            )}
        </Paper>
    );

    return (
        <Box display="flex">
            <Sidebar />
            <Box flexGrow={1} ml={{ xs: 0, md: '250px' }}>
                <Navbar />
                <Box sx={{ p: 1, pt: 4, bgcolor: '#f5f5f5', minHeight: '80vh' }}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ mb: 2 }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Accueil
                        </Link>
                        <Typography color="text.primary" fontWeight="bold">
                            Tableau de bord
                        </Typography>
                    </Breadcrumbs>
                    <Grid container spacing={2}>
                        <Grid item sx={{ width: "15%", height: "7%" }} xs={6} sm={4} md={4}>
                            <StatCard
                                label="Total Demandes"
                                value={stats.totalDemandes}
                                percent={calculatePercentage(stats.totalDemandes, stats.totalDemandes)}
                                color="blue"
                                total={stats.totalDemandes}
                            />
                        </Grid>
                        <Grid item sx={{ width: "16%", height: "7%" }} xs={6} sm={6} md={4}>
                            <StatCard
                                label="En Attente"
                                value={stats.demandesEnAttente}
                                percent={calculatePercentage(stats.demandesEnAttente, stats.totalDemandes)}
                                color="orange"
                                total={stats.totalDemandes}
                            />
                        </Grid>
                        <Grid item sx={{ width: "16%", height: "7%" }} xs={6} sm={6} md={4}>
                            <StatCard
                                label="Acceptées"
                                value={stats.demandesValidees}
                                percent={calculatePercentage(stats.demandesValidees, stats.totalDemandes)}
                                color="green"
                                total={stats.totalDemandes}
                            />
                        </Grid>
                        <Grid item sx={{ width: "16%", height: "7%" }} xs={12} sm={6} md={4}>
                            <StatCard
                                label="Refusées"
                                value={stats.demandesRefusees}
                                percent={calculatePercentage(stats.demandesRefusees, stats.totalDemandes)}
                                color="red"
                                total={stats.totalDemandes}
                            />
                        </Grid>
                        <Grid item sx={{ width: "16%", height: "7%" }} xs={12} sm={6} md={4}>
                            <StatCard
                                label="Impôts Réglés"
                                value={stats.impotsRegles}
                                percent={calculatePercentage(stats.impotsRegles, stats.impotsRegles + stats.impotsNonRegles)}
                                color="green"
                                total={stats.impotsRegles + stats.impotsNonRegles}
                            />
                        </Grid>
                        <Grid item sx={{ width: "15%", height: "7%" }} xs={12} sm={6} md={4}>
                            <StatCard
                                label="Impôts Non Réglés"
                                value={stats.impotsNonRegles}
                                percent={calculatePercentage(stats.impotsNonRegles, stats.impotsRegles + stats.impotsNonRegles)}
                                color="red"
                                total={stats.impotsRegles + stats.impotsNonRegles}
                            />
                        </Grid>
                    </Grid>

                    <Grid item sx={{ width: "100%" }}>
                        <Paper elevation={2} sx={{ p: 2, mt: 4, borderRadius: 3 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Carte des Demandes
                            </Typography>
                            <Box sx={{ height: 500 }}>
                                <MapComponents />
                            </Box>
                        </Paper>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
