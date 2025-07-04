import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "coffee", // fallback/default
      setTheme: (newTheme) => {
        set({ theme: newTheme });
      },
    }),
    {
      name: "streamify-theme", // key in localStorage
      getStorage: () => localStorage, // specify localStorage
    }
  )
);
