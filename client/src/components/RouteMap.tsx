import type { Stop } from "@/lib/routeData";
import { useEffect, useRef, useState } from "react";

type Leaflet = any;
type Props = { stops: Stop[]; selectedId: string; onSelect: (id: string) => void };

declare global {
  interface Window { L?: Leaflet }
}

let leafletPromise: Promise<Leaflet> | null = null;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    css.crossOrigin = "";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.crossOrigin = "";
    script.onload = () => window.L ? resolve(window.L) : reject(new Error("Leaflet is unavailable"));
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.head.appendChild(script);
  });
  return leafletPromise;
}

export function RouteMap({ stops, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet | null>(null);
  const layerRef = useRef<Leaflet | null>(null);
  const [leaflet, setLeaflet] = useState<Leaflet>(null);

  useEffect(() => {
    let live = true;
    loadLeaflet().then(instance => { if (live) setLeaflet(instance); }).catch(() => undefined);
    return () => { live = false; };
  }, []);

  useEffect(() => {
    if (!leaflet || !containerRef.current || mapRef.current) return;
    const map = leaflet.map(containerRef.current, { zoomControl: false, attributionControl: true, scrollWheelZoom: false });
    leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap contributors" }).addTo(map);
    leaflet.control.zoom({ position: "bottomright" }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [leaflet]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !leaflet) return;
    layerRef.current?.remove();
    const group = leaflet.layerGroup().addTo(map);
    const path = stops.map(stop => [stop.coordinates.lat, stop.coordinates.lng]);
    leaflet.polyline(path, { color: "#e05d3a", weight: 4, opacity: .92, dashArray: "10 10", lineCap: "round" }).addTo(group);
    stops.forEach((stop, index) => {
      const active = stop.id === selectedId ? " is-active" : "";
      const icon = leaflet.divIcon({
        className: "route-marker-wrap",
        iconSize: [38, 46],
        iconAnchor: [19, 38],
        html: `<button class="route-marker ${stop.theme}${active}" aria-label="${stop.place}"><span>${index + 1}</span><i></i></button>`,
      });
      const marker = leaflet.marker([stop.coordinates.lat, stop.coordinates.lng], { icon, keyboard: false }).addTo(group);
      marker.on("click", () => onSelect(stop.id));
    });
    const bounds = leaflet.latLngBounds(path);
    map.fitBounds(bounds, { padding: [52, 52], maxZoom: 9 });
    layerRef.current = group;
  }, [leaflet, selectedId, stops, onSelect]);

  return <div ref={containerRef} className="route-map" aria-label="Интерактивная карта фактического яхтенного маршрута" />;
}
