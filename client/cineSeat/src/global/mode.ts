import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useTheme = create<Theme>()(
  persist(
    (set, get) => ({
      isDarkMode: true,
      toggleTheme: () => {
        set({ isDarkMode: !get().isDarkMode });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useMovieStore = create(
  persist(
    (set, get) => ({
      movies: [],
      lastFetched: 0,
      setMovies: (movies: any) => set({ movies, lastFetched: Date.now() }),
      fetchMovies: async () => {
        const TEN_MINUTES = 10 * 60 * 1000;
        if (Date.now() - get().lastFetched < TEN_MINUTES) return; // Avoid frequent fetching

        try {
          const res = await fetch("http://localhost:5000");
          const data = await res.json();

          console.log("RES: ", res);

          set({ movies: data.data, lastFetched: Date.now() });
        } catch (error) {
          console.error("Failed to fetch movies: ", error);
        }
      },
    }),
    {
      name: "movie-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        movies: state.movies,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
