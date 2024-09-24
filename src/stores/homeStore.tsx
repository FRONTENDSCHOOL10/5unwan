import { Exercise } from "@/api/pocketbase";
import { create } from 'zustand';

interface Store {
  isActive: string;
  filtered: Exercise[] | { items: Exercise[] } | string;
  exercises: Exercise[];
  show: boolean;
}

interface Action {
  setIsActive: (isActive: string) => void;
  setFiltered: (filtered: Exercise[] | string) => void;
  setExercises: (exercises: Exercise[]) => void;
  setShow: (show: boolean) => void;
}

const useStore = create<Store & Action>((set) => ({
  isActive: "",
  setIsActive: (isActive) => set({ isActive }),
  
  filtered: "",
  setFiltered: (filtered) => set({ filtered }),

  exercises: [],
  setExercises: (exercises) => set({ exercises }),

  show: false,
  setShow: (show) => set({ show }),
}));

export default useStore;