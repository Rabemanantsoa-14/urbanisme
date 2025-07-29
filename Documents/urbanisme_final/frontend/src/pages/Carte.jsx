import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import UploadForm from "./UploadForm";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Link,
    Box
} from "@mui/material";
import Navbar from "../components/layouts/Navbar";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function MapComponents() {
    const [showForm, setShowForm] = useState(false);
    const [formCoords, setFormCoords] = useState(null);
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    useEffect(() => {
        const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        });

        const googleSat = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            attribution: "&copy; Google Satellite",
        });

        const map = L.map("map", {
            center: [-21.455, 47.0857],
            zoom: 13,
            layers: [osm],
        });

        const customControl = L.Control.extend({
            options: { position: "topleft" },
            onAdd: function () {
                const button = L.DomUtil.create("button", "leaflet-bar");
                button.innerHTML = "📄";
                button.title = "Télécharger le formulaire";
                button.style.padding = "8px";
                button.style.backgroundColor = "#eff2f4ff";
                button.style.color = "black";
                button.style.border = "none";
                button.style.cursor = "pointer";
                L.DomEvent.disableClickPropagation(button);
                L.DomEvent.on(button, "click", () => {
                    setShowDownloadModal(true);
                });
                return button;
            },
        });

        map.addControl(new customControl());

        const baseMaps = {
            OpenStreetMap: osm,
            "Google Satellite": googleSat,
        };
        L.control.layers(baseMaps).addTo(map);

        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        new L.Control.Draw({
            edit: { featureGroup: drawnItems },
            draw: {
                polygon: false,
                rectangle: false,
                circle: false,
                polyline: false,
                marker: true,
            },
        }).addTo(map);

        map.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;
            if (layer instanceof L.Marker) {
                const { lat, lng } = layer.getLatLng();
                setFormCoords({ lat, lng });
                setShowForm(true);
            }
            drawnItems.addLayer(layer);
        });

        return () => map.remove();
    }, []);

    return (
        <>
            <Navbar />
            <div
                id="map"
                style={{
                    position: "fixed",
                    top: 90,
                    left: 0,
                    height: "100vh",
                    width: "100vw",
                    zIndex: 0,
                }}
            />

            {showForm && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: { xs: "90%", sm: "70%", md: "50%" },
                        maxHeight: "90vh",
                        overflowY: "auto",
                        zIndex: 1000,
                        backgroundColor: "white",
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 5,
                    }}
                >
                    <UploadForm
                        onClose={() => setShowForm(false)}
                        lat={formCoords?.lat}
                        lng={formCoords?.lng}
                    />
                </Box>
            )}

            <Dialog open={showDownloadModal} onClose={() => setShowDownloadModal(false)}>
                <DialogTitle>Téléchargement du formulaire</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Cliquez sur le bouton ci-dessous pour télécharger le formulaire de demande :
                    </Typography>
                    <Link
                        href="/docs/3-Demande_permis_construire.docx"
                        download
                        underline="hover"
                        target="_blank"
                        rel="noopener"
                        sx={{ fontWeight: 500 }}
                    >
                        📄 Télécharger le document
                    </Link>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDownloadModal(false)} color="primary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}