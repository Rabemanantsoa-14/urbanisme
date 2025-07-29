import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

// Fix icônes Leaflet (Vite)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function MapComponents() {
    const [showForm, setShowForm] = useState(false); // ✅ État pour le formulaire

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
            center: [-21.4550, 47.0857],
            zoom: 13,
            layers: [osm],
        });

        // ✅ Bouton "Demande"
        const customControl = L.Control.extend({
            options: { position: 'topleft' },

            onAdd: function () {
                const button = L.DomUtil.create('button', 'leaflet-bar');
                button.innerHTML = '📄';
                button.title = 'Ouvrir le formulaire';
                button.style.padding = '8px';
                button.style.backgroundColor = '#eff2f4ff';
                button.style.color = 'black';
                button.style.border = 'none';
                button.style.cursor = 'pointer';

                L.DomEvent.disableClickPropagation(button);

                L.DomEvent.on(button, 'click', () => {
                    setShowForm(true); // ✅ Affiche le formulaire React
                });

                return button;
            }
        });

        map.addControl(new customControl());

        // ✅ Couches de fond
        const baseMaps = {
            "OpenStreetMap": osm,
            "Google Satellite": googleSat,
        };
        L.control.layers(baseMaps).addTo(map);

        // ✅ Outils de dessin
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

        // ✅ Action sur ajout de marqueur
        map.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;

            if (layer instanceof L.Marker) {
                const { lat, lng } = layer.getLatLng();

                const popupContent = `
          <strong>Coordonnées</strong><br>
          Latitude: ${lat.toFixed(5)}<br>
          Longitude: ${lng.toFixed(5)}<br>
          <a href="/docs/3-Demande_permis_construire.docx" download style="color:blue;">
            📄 Télécharger le formulaire
          </a>
        `;

                layer.bindPopup(popupContent).openPopup();
            }

            drawnItems.addLayer(layer);
        });

        return () => map.remove();
    }, []);

    return (
        <>
            <div id="map" style={{ height: "100%", width: "100%" }} />

            {showForm && (
                <div style={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    zIndex: 1000,
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)"
                }}>
                    <UploadForm onClose={() => setShowForm(false)} />
                </div>
            )}
        </>
    );
}
