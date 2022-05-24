import create from "zustand";
import { Feature } from "../utils/types";

const initialMarker: Feature[] = [];

interface MarkerState {
  marker: Feature[];
  setMarkerArray: (m: Feature[]) => void;
}

export const useMarkerStore = create<MarkerState>()((set) => ({
  marker: initialMarker,
  setMarkerArray: (m) => set((state) => ({ marker: m })),
}));
