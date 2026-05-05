import { create } from "zustand";

type Theme = "midnight" | "forest";

interface FocusState {
  time: number;
  isRunning: boolean;
  theme: Theme;
  tasks: { id: string; text: string; done: boolean }[];

  start: () => void;
  pause: () => void;
  reset: () => void;

  setTheme: (theme: Theme) => void;

  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
}

export const useFocusStore = create<FocusState>((set) => ({
  time: 1500,
  isRunning: false,
  theme: "midnight",
  tasks: [],

  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => set({ time: 1500, isRunning: false }),

  setTheme: (theme) => set({ theme }),

  addTask: (text) =>
    set((state) => ({
      tasks: [...state.tasks, { id: crypto.randomUUID(), text, done: false }],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
}));