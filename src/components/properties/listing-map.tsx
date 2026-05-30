"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marketplace polish (#9): list-page map showing each listing as a marker.
// Click marker → popup with name + price + link.

export type MapPoint = {
  id: string;
  name: string | null;
  lat: number;
  lng: number;
  type: "crowdfund" | "rent" | "sale";
  price: number | null;
  total_cost: number | null;
  rent_period: "month" | "year" | null;
  city: string | null;
};

const money = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

const TYPE_COLOR: Record<MapPoint["type"], string> = {
  crowdfund: "#059669", // emerald-600
  rent: "#2563eb",      // blue-600
  sale: "#7c3aed",      // violet-600
};

function makeIcon(color: string) {
  // Inline SVG pin so we don't need to fix leaflet's default-icon asset paths.
  const html = `
    <span style="display:inline-block;transform:translate(-50%,-100%);">
      <svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 14 24 14 24s14-14.5 14-24c0-7.73-6.27-14-14-14z" fill="${color}"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>
    </span>`;
  return L.divIcon({
    className: "",
    html,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
  });
}

function FitToBounds({ points }: { points: MapPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 13);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

export default function ListingMap({ points }: { points: MapPoint[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const initial = useMemo<[number, number]>(
    () => (points[0] ? [points[0].lat, points[0].lng] : [25.2048, 55.2708]), // Dubai
    [points]
  );

  if (!mounted) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <MapContainer
        center={initial}
        zoom={11}
        scrollWheelZoom
        style={{ height: 360, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToBounds points={points} />
        {points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={makeIcon(TYPE_COLOR[p.type])}>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
                  {p.city ?? ""}
                </div>
                <div style={{ fontWeight: 700, color: TYPE_COLOR[p.type], marginBottom: 8 }}>
                  {p.type === "crowdfund"
                    ? money(p.total_cost)
                    : p.type === "rent"
                      ? `${money(p.price)}${p.rent_period === "year" ? " /year" : " /month"}`
                      : money(p.price)}
                </div>
                <a
                  href={`/properties/${p.id}`}
                  style={{
                    display: "inline-block",
                    background: TYPE_COLOR[p.type],
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  View →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
