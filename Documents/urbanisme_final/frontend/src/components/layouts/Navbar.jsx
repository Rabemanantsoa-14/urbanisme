import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const pages = ['Accueil', 'Services', 'À propos', 'Contact'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffff', color: "GrayText" }}>
            <Toolbar>

                {/* Logo */}
                <Typography variant="h6" color="black" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
                    Tableau de bord
                </Typography>

                {/* Menu hamburger (petit écran) */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                {/* Menu principal (grand écran) */}


                {/* Icônes à droite */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton color="inherit">
                        <Link to="/notification">
                            <NotificationsIcon /> 
                        </Link>
                    </IconButton>
                    <IconButton color="inherit">
                        <Link to="/profile">
                            <FaUser size={20} /> 
                        </Link>
                    </IconButton>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;