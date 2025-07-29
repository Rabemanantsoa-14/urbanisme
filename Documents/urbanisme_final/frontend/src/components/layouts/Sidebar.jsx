import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    Typography,
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    IconButton,
    Collapse
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { FaMapMarkedAlt, FaCity } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [listOpen, setListOpen] = React.useState(true);

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
                sx: {
                    width: 250,
                    bgcolor: '#ffffff',
                    color: '#18181b',
                    boxShadow: '4px 0 8px rgba(0, 0, 0, 0.3)',
                },
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={2}>
                <Box display="flex" alignItems="center" gap={1}>
                    <FaCity size={22} color="#18181b" />
                    <Typography variant="h6" fontWeight="bold" color="#18181b">
                        URBANISME
                    </Typography>
                </Box>
                {isMobile && (
                    <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="Fermer le menu">
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
            <Box px={2} mt={2}>
                <List component="nav">
                    <ListItemButton onClick={() => setListOpen(!listOpen)}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <ListItemText primary="Listes" />
                            {listOpen ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                    </ListItemButton>
                    <Collapse in={listOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/impot')}>
                                <ListItemIcon>
                                    <PaidIcon />
                                </ListItemIcon>
                                <ListItemText primary="Impot" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/demande')}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Demande" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => navigate('/carte')}>
                        <ListItemIcon>
                            <FaMapMarkedAlt color="#18181b" />
                        </ListItemIcon>
                        <ListItemText primary="Carte" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
