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

export const useMovieStore = create((set) => ({
  movies: [],
  setMovies: (movies: any) => set({ movies }),
  fetchMovies: async () => {
    try {
      const res = await fetch("http://localhost:5000");
      const data = await res.json();

      set({ movies: data.data });
    } catch (error) {
      console.error("Failed to fetch movies: ", error);
    }
  },
}));
