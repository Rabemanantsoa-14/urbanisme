// UploadForm.js
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    Grid,
    Divider,
} from "@mui/material";
import { Upload, FileText, X } from "lucide-react";

export default function UploadForm({ lat, lng, onClose }) {
    const [formData, setFormData] = useState({
        planCadastral: null,
        demandeConstruction: null,
        certificatResidence: null,
        carteIdentite: null,
    });

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setFormData({ ...formData, [field]: file });
    };

    const isFormValid = formData.planCadastral && formData.demandeConstruction;

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6">Formulaire de Demande</Typography>
                        <Typography variant="body2" color="green">
                            Veuillez joindre tous les documents requis au format PDF
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose}><X /></IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Box mb={2}>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Coordonnées du marquage:</strong> Latitude: {lat}, Longitude: {lng}
                    </Typography>
                </Box>

                <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Documents requis <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label" fullWidth startIcon={<Upload />}>
                                Plan Cadastral (PDF)
                                <input type="file" accept="application/pdf" hidden onChange={(e) => handleFileChange(e, "planCadastral")} />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label" fullWidth startIcon={<Upload />}>
                                Demande de Construction (PDF)
                                <input type="file" accept="application/pdf" hidden onChange={(e) => handleFileChange(e, "demandeConstruction")} />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                <Box mt={3}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Documents optionnels
                    </Typography>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label" fullWidth startIcon={<FileText />}>
                                Certificat de Résidence (PDF)
                                <input type="file" accept="application/pdf" hidden onChange={(e) => handleFileChange(e, "certificatResidence")} />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label" fullWidth startIcon={<FileText />}>
                                Carte d'Identité (PDF)
                                <input type="file" accept="application/pdf" hidden onChange={(e) => handleFileChange(e, "carteIdentite")} />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions>
                <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={1}>
                    {!isFormValid && (
                        <Typography color="error" variant="body2">
                            Veuillez joindre au minimum le Plan Cadastral et la Demande de Construction
                        </Typography>
                    )}
                    <Button variant="contained" color="success" fullWidth disabled={!isFormValid}>
                        Envoyer la demande
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
} 