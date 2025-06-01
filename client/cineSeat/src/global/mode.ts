import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface Review {
  movieId: string;
  rating: number; // between 1 and 10
  review?: string;
  createdAt?: Date;
}

export interface Booking {
  movieId: string;
  showtimeId: string;
  theaterName?: string;
  seats: string[];
  totalPrice?: number;
  bookingDate?: Date;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;

  favorites: string[];
  watchlist: string[];
  reviews: Review[];
  bookings: Booking[];

  createdAt?: Date;
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
          const res = await fetch("http://localhost:5000/api/movies");
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

export const useUserStore = create(
  persist(
    (
      set: any,
      get: () => {
        isLoading: any;
      }
    ) => ({
      currentUser: null,
      isLoading: null,
      error: null,
      favorites: [],
      watchlist: [],
      reviews: [],
      tickets: [],

      // Set current user
      setCurrentUser: (user: User) => {
        set({ currentUser: user });
      },

      // Login user
      loginUser: async (
        previousState: string | undefined,
        formData: FormData
      ) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log(email, password);

        if (!password || !email) {
          return { success: false, message: "Please fill in all fields." };
        }

        set({
          isLoading: true,
          error: null,
          currentUser: null,
        });

        // Add a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          if (useUserStore.getState().isLoading) {
            set({
              isLoading: false,
              error: "Request timed out. Please try again.",
            });
          }
          // 10 second timeout
        }, 10000);

        try {
          const res = await axios.post(`http://localhost:5000/api/user/login`, {
            email,
            password,
          });

          clearTimeout(timeoutId); // Clear the timeout if request completes

          console.log("RES: ", res);

          const token = res.data.token;
          const user = res.data.user;

          if (!token || !user) {
            throw new Error("Invalid response from server");
          }

          localStorage.setItem("token", token);
          set({
            currentUser: user,
            isLoading: false,
            error: null,
          });

          return null;
        } catch (error: Error | any) {
          // Clear the timeout if request completes
          clearTimeout(timeoutId);

          let errorMessage = "Login failed. Please try again.";
          if (error.response) {
            errorMessage = error.response.data?.error || errorMessage;
          } else if (error.request) {
            errorMessage = "Network error. Please check your connection.";
          }

          // Clear any invalid token
          localStorage.removeItem("token");

          set({
            isLoading: false,
            error: "Failed to login. Please check your credentials.",
          });
        }
      },

      // Register User
      registerUser: async (
        previousState: string | undefined,
        formData: FormData
      ) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password != confirmPassword) {
          return {
            success: false,
            message: "Passwords do not match",
          };
        }

        set({
          isLoading: true,
          error: null,
          currentUser: null,
        });

        // Add a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          if (useUserStore.getState().isLoading) {
            set({
              isLoading: false,
              error: "Request timed out. Please try again.",
            });
          }
          // 10 second timeout
        }, 10000);

        try {
          const res = await axios.post(
            `http://localhost:5000/api/user/register`,
            {
              name,
              email,
              password,
            }
          );

          clearTimeout(timeoutId);

          const token = res.data.token;

          if (!token) {
            throw new Error("Invalid response from server");
          }

          console.log("RES: ", res);

          localStorage.setItem("token", token);
          set({
            currentUser: res.data.user,
            isLoading: false,
            error: null,
          });

          return null; // Return null for useActionState
        } catch (error: Error | any) {
          // Clear the timeout if request completes
          clearTimeout(timeoutId);

          let errorMessage = "Signup failed. Please try again.";

          if (error.response) {
            errorMessage = error.response.data?.error || errorMessage;
          } else if (error.request) {
            errorMessage = "Network error. Please check your connection.";
          }

          // Clear any invalid token
          localStorage.removeItem("token");

          set({
            isLoading: false,
            error: "Failed to login. Please check your credentials.",
          });
        }
      },

      // Sign out User
      signOutUser: () => {
        localStorage.removeItem("token"); // Remove token
        set({
          currentUser: null,
          isLoading: false,
          error: null,
          favorites: [],
          watchlist: [],
          reviews: [],
          tickets: [],
        });
      },

      // Process Payment
      processPayment: async (
        currentUser: any,
        movieDetails: any,
        bookingDetails: any
      ) => {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/user/${currentUser.id}/book/ticket`,
            {
              movieDetails,
              bookingDetails,
            }
          );
          console.log("Booking Successful:", response.data);

          const updatedUser = response.data.user;

          if (updatedUser) {
            set({ currentUser: updatedUser });
          }

          return response.data;
        } catch (error: any) {
          console.error(
            "Booking Failed:",
            error.response?.data || error.message
          );
          throw new Error(error.response?.data?.message || "Booking failed");
        }
      },

      // Get seats
      getTakenSeats: async (showtimeId: string) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/showtime/${showtimeId}/seats`
          );

          return response.data.takenSeats;
        } catch (error: any) {
          console.error(
            "Failed getting taken seats:",
            error.response?.data || error.message
          );
          throw new Error(error.response?.data?.message || "Booking failed");
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
