'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// マーカーアイコン設定
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function MapComponent() {
  return (
    <MapContainer
      center={[35.6895, 139.6917]}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-96 rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {/* 東京都中心部 */}
      <Marker position={[35.6895, 139.6917]} />
      {/* 三軒茶屋 */}
      <Marker position={[35.641274, 139.669925]} />
    </MapContainer>
  );
}
