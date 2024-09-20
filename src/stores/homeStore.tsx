import { Exercise } from "@/api/pocketbase";
import { create } from 'zustand';

interface Store {
  isActive: string;
  filtered: Exercise[] | { items: Exercise[] } | string;
  exercises: Exercise[];
}

interface Action {
  setIsActive: (isActive: string) => void;
  setFiltered: (filtered: Exercise[] | string) => void;
  setExercises: (exercises: Exercise[]) => void;
}

const useStore = create<Store & Action>((set) => ({
  isActive: "",
  setIsActive: (isActive) => set({ isActive }),
  
  filtered: "",
  setFiltered: (filtered) => set({ filtered }),

  exercises: [],
  setExercises: (exercises) => set({ exercises }),
}));

export default useStore;