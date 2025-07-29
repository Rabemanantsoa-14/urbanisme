
/*import React, { useState, useEffect } from "react";
import {
    Table, TableHead, TableRow, TableCell,
    TableBody, TableContainer, Paper,
    Checkbox, Typography, Box
} from "@mui/material";
import { fetchDemandes } from "../../services/ListeApi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ActionMenu from "../../components/ActionMenu";



const generateFakeData = () => {
    const status = ['Proprietaire', 'Mandataire', 'Autres'];
    const nationalite = ['Malagasy', 'Etrangere'];
    const fakeData = [];

    for (let i = 1; i <= 20; i++) {
        fakeData.push({
            id: i,
            nom: `Nom${i}`,
            prenom: `Prenom${i}`,
            email: `user${i}@example.com`,
            tel: `034 ${100 + i} ${200 + i}`,
            adresse: `Adresse ${i}`,
            cin: `CIN${1000 + i}`,
            status: status[i % status.length]
        });
    }

    return fakeData;
};

function Impot() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const localData = generateFakeData();
        setRows(localData);
    }, []);
    /*const [rows, setRows] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDemandes();
                setRows(data);
            } catch (error) {
            }
        };

        loadData();
    }, []);*/
/*const columns = [
    { field: "id", headerName: "ID", cellClassName: "name-column--cell" },
    { field: "nom", headerName: "Nom", flex: 1 },
    { field: "prenom", headerName: "Prénoms", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "tel", headerName: "Téléphone", flex: 1 },
    { field: "adresse", headerName: "Adresse", flex: 1 },
    { field: "cin", headerName: "CIN", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
        row.id === id ? { ...row, status: newStatus } : row
    );
    setRows(updatedRows);
};




return (
    <>
        <TableContainer component={Paper} sx={{ maxHeight: "90dvh" }}>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: "grey" },
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
                    rows={rows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    enableMultipleRowSelection
                    checkboxSelection

                />
            </Box>
        </TableContainer>

        {/* FOOTER /}*/
/*<Box
    sx={{
        backgroundColor: "#c3cfff",
        p: 2,
        textAlign: "right",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    }}
>
    <Typography variant="body2" fontWeight="bold">
        Nombre total d'utilisateurs : {rows.length}
    </Typography>
</Box>
</>
);
}

export default Impot;*/
