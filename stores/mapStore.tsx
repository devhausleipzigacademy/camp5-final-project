import { createRef } from "react";
import create from "zustand";

export type MapRef = React.MutableRefObject<mapboxgl.Map | null>;

interface MapState {
  mapRef: MapRef;
  setMapRef: (r: MapRef) => void;
}

export const useMapStore = create<MapState>()((set) => ({
  mapRef: createRef(),
  setMapRef: (r) => set((state) => ({ mapRef: r })),
}));
