import React, { useState, useEffect } from "react";
import {
    TableContainer, Paper,
    Typography, Box
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionMenu from "../../components/layouts/ActionMenu";
import { fetchDemandes } from "../../services/ListeApi";

import Navbar from '../../components/layouts/Navbar';
import Sidebar from '../../components/layouts/Sidebar';

function Demande() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDemandes();
                console.log("Frontend: ", data);

                const formatted = data
                    .filter(item => item.users_id !== null)
                    .map((item) => ({
                        id: item.users_id,
                        nom: item.users_nom,
                        prenom: item.users_prenom,
                        adresse: item.users_adresse,
                        email: item.users_email,
                        telephone: item.users_telephone,
                        cin: item.users_cin,
                        piece_joint: item.permi_piece_joint,
                        permi: item.permi_permi,
                        statut: item.permi_statut,
                    }));

                setRows(formatted);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };

        loadData();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "nom", headerName: "Nom", flex: 1 },
        { field: "prenom", headerName: "Prénoms", flex: 1 },
        { field: "adresse", headerName: "Adresse", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "telephone", headerName: "Téléphone", flex: 1 },
        { field: "cin", headerName: "CIN", flex: 1 },
        { field: "piece_joint", headerName: "Pièce jointe", flex: 1 },
        { field: "permi", headerName: "Demande", flex: 1 },
        { field: "statut", headerName: "Statut", flex: 1 },
        {
            field: "action",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <ActionMenu rowId={params.row.id} onAction={handleAction} />
            )
        }
    ];

    const handleAction = (id, newStatus) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, statut: newStatus } : row
        );
        setRows(updatedRows);
    };

    return (
        <Box display="flex">
            {/* ⬅️ Barre latérale */}
            <Sidebar />

            {/* ➡️ Contenu principal */}
            <Box flexGrow={1}>
                <Navbar /> {/* ✅ Barre de navigation en haut */}

                <Box px={2} py={2}>
                    <TableContainer component={Paper} sx={{ maxHeight: "90dvh" }}>
                        <Box
                            m="40px 0 0 0"
                            height="75vh"
                            sx={{
                                "& .MuiDataGrid-root": { border: "none" },
                                "& .MuiDataGrid-cell": { borderBottom: "none" },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "white",
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: "white",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "none",
                                    backgroundColor: "chocolate",
                                },
                                "& .MuiCheckbox-root": {
                                    color: `grey !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `grey !important`,
                                },
                            }}
                        >
                            <DataGrid
                                getRowId={(row) => row.id}
                                rows={rows}
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                checkboxSelection
                                enableMultipleRowSelection
                            />
                        </Box>
                    </TableContainer>

                    <Box
                        sx={{
                            backgroundColor: "#164b4d",
                            p: 2,
                            textAlign: "right",
                            borderBottomLeftRadius: 6,
                            borderBottomRightRadius: 6,
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold" color="white">
                            Nombre total d'utilisateurs : {rows.length}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Demande;
