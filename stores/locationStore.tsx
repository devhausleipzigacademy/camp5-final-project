import create from "zustand";

const initialLoaction: [number, number] = [12.373565, 51.341463];

interface LocationState {
  location: [number, number];
  setLocation: (l: [number, number]) => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
  location: initialLoaction,
  setLocation: (l) => set((state) => ({ location: l })),
}));
