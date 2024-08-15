import { socket } from "../socket";
import { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

export default function Map() {
  const [view, setView] = useState<LatLngExpression>();

  useEffect(() => {
    function onReceiveLoaction(value: {
      id: string;
      latitude: number;
      longitude: number;
    }) {
      const { latitude, longitude } = value;
      setView([latitude, longitude]);
    }
    socket.on("receive-location", onReceiveLoaction);

    return () => {
      socket.off("receive-location", onReceiveLoaction);
    };
  }, []);

  return (
    <>
      {view && (
        <MapContainer center={view} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={view!}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}
