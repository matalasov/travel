/** DESIGN MEMORY — “Штурманский стол”: the map is a calm editorial navigation surface. */
import { MapView } from "@/components/Map";
import type { Stop } from "@/lib/routeData";
import { useEffect, useRef, useState } from "react";

type Props = { stops: Stop[]; selectedId: string; onSelect: (id: string) => void };

export function RouteMap({ stops, selectedId, onSelect }: Props) {
  const [map, setMap] = useState<any>(null);
  const layers = useRef<{ markers: any[]; route: any | null }>({ markers: [], route: null });

  useEffect(() => {
    if (!map || !window.google) return;
    layers.current.markers.forEach(marker => (marker.map = null));
    layers.current.route?.setMap(null);
    map.setOptions({
      mapTypeControl: false, streetViewControl: false, fullscreenControl: false,
      zoomControlOptions: { position: window.google.maps.ControlPosition.RIGHT_BOTTOM },
      styles: [
        { elementType: "geometry", stylers: [{ color: "#e9e5db" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#4d5960" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f6f3ec" }, { weight: 3 }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#a9c9cf" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfe1d4" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e8" }] },
      ],
    });

    const path = stops.map(stop => stop.coordinates);
    const route = new window.google.maps.Polyline({
      path, geodesic: true, strokeColor: "#E05D3A", strokeOpacity: .94, strokeWeight: 4, map,
      icons: [{ icon: { path: "M 0,-1 0,1", strokeOpacity: .72, scale: 3 }, offset: "0", repeat: "18px" }],
    });
    const markers = stops.map((stop, index) => {
      const content = document.createElement("button");
      content.className = `route-marker ${stop.theme} ${stop.id === selectedId ? "is-active" : ""}`;
      content.setAttribute("aria-label", `${stop.place}: ${stop.label}`);
      content.innerHTML = `<span>${index + 1}</span><i></i>`;
      content.addEventListener("click", () => onSelect(stop.id));
      return new window.google.maps.marker.AdvancedMarkerElement({ map, position: stop.coordinates, title: stop.place, content });
    });
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach(point => bounds.extend(point));
    map.fitBounds(bounds, { top: 70, right: 76, bottom: 70, left: 76 });
    layers.current = { markers, route };
    return () => { markers.forEach(marker => (marker.map = null)); route.setMap(null); };
  }, [map, stops, selectedId, onSelect]);

  return <MapView initialCenter={{ lat: 36.69, lng: 28.72 }} initialZoom={9} onMapReady={setMap} className="route-map" />;
}
