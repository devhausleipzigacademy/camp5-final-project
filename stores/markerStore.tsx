import mapboxgl from "mapbox-gl";
import create from "zustand";

const initialMarker: mapboxgl.Marker[] = [];

interface MarkerState {
  marker: mapboxgl.Marker[];
  setMarkerArray: (m: mapboxgl.Marker[]) => void;
}

export const useMarkerStore = create<MarkerState>()((set) => ({
  marker: initialMarker,
  setMarkerArray: (m) => set((state) => ({ marker: m })),
}));
