import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useTheme = create<Theme>()(
  persist(
    (set, get) => ({
      isDarkMode: true, // Default to dark mode
      toggleTheme: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
      },
    }),
    {
      name: "theme-storage", // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);
