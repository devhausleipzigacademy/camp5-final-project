import create from "zustand";

const initialRequests: number = 0;

interface RequestState {
  requests: number;
  setRequests: (r: number) => void;
}

export const useRequestStore = create<RequestState>()((set) => ({
  requests: initialRequests,
  setRequests: (r) => set((state) => ({ requests: r })),
}));
