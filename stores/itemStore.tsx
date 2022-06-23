import { Feature } from "ol";
import create from "zustand";
import { getMapData } from "../utils/getMapData";
import { Geometry, MapData } from "../utils/types";

const initialItems: MapData = { type: "featureCollection", features: [] };

interface ItemState {
  items: MapData;
  setItems: (i: MapData) => void;
}

export const useItemStore = create<ItemState>()((set) => ({
  items: initialItems,
  setItems: (i) => set((state) => ({ items: i })),
}));
