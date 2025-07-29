import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const ActionMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleActionClick = (action) => {
        setSelectedAction(action);
        setOpenDialog(true);
        handleMenuClose();
    };

    const handleConfirm = () => {
        setSnackbarMessage(`Action "${selectedAction}" confirmée !`);
        setSnackbarOpen(true);
        setOpenDialog(false);
    };

    return (
        <>
            {/* Trois points */}
            <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
            </IconButton>

            {/* Menu déroulant */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleActionClick('Valider')}>
                    <CheckIcon fontSize="small" color="success" style={{ marginRight: 8 }} />
                    Valider
                </MenuItem>
                <MenuItem onClick={() => handleActionClick('Refuser')}>
                    <CloseIcon fontSize="small" color="error" style={{ marginRight: 8 }} />
                    Refuser
                </MenuItem>
                <MenuItem onClick={() => handleActionClick('En attente')}>
                    <HourglassBottomIcon fontSize="small" style={{ marginRight: 8, color: 'orange' }} />
                    En attente
                </MenuItem>
            </Menu>

            {/* Boîte de confirmation */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Confirmer l’action "{selectedAction}" ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary">
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </>
    );
};

export default ActionMenu;
