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
          const res = await fetch(
            "http://https://cineseatbackend.onrender.com/api/movies"
          );
          const data = await res.json();

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
        currentUser: any;
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
          const res = await axios.post(
            `http://https://cineseatbackend.onrender.com/api/user/login`,
            {
              email,
              password,
            }
          );

          clearTimeout(timeoutId); // Clear the timeout if request completes

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
            `http://https://cineseatbackend.onrender.com/api/user/register`,
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

      // Edit User Profile
      updateUser: async (
        previousState: string | undefined,
        formData: FormData
      ) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (
          !currentPassword ||
          !name ||
          !newPassword ||
          !confirmPassword ||
          !email
        ) {
          return { success: false, message: "Please fill in all fields." };
        }

        if (newPassword != confirmPassword) {
          return { success: false, message: "New Password does not match." };
        }

        // set({
        //   isLoading: true,
        //   error: null,
        //   currentUser: null,
        // });

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
          const userId = useUserStore.getState().currentUser?._id;

          const response = await axios.put(
            `http://https://cineseatbackend.onrender.com/api/user/${userId}`,
            {
              name,
              email,
              currentPassword,
              newPassword,
              confirmNewPassword: confirmPassword,
            }
          );

          clearTimeout(timeoutId);

          set({
            isLoading: false,
            currentUser: response.data.user,
            error: null,
          });

          return {
            success: true,
            message: response.data.message || "User updated.",
          };
        } catch (error: any) {
          clearTimeout(timeoutId);

          const message =
            error.response?.data?.message ||
            "Something went wrong during update.";

          set({
            isLoading: false,
            error: message,
          });

          return { success: false, message };
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
            `http://https://cineseatbackend.onrender.com/api/user/${currentUser._id}/book/ticket`,
            {
              movieDetails,
              bookingDetails,
            }
          );

          const updatedUser = response.data.user;

          // Update user in store if available
          if (updatedUser) {
            set({ currentUser: updatedUser });
          }

          return response.data;
        } catch (error: any) {
          // Axios error formatting
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Booking failed. Please try again.";

          console.error("❌ Booking Failed:", message);

          // Optional: Notify user via toast/snackbar here

          throw new Error(message);
        }
      },

      // Get seats
      getTakenSeats: async (showtimeId: string) => {
        try {
          const response = await axios.get(
            `http://https://cineseatbackend.onrender.com/api/user/showtime/${showtimeId}/seats`
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

      // Add User Favorite
      addToFavorites: async (currentUser: any, movieData: any) => {
        try {
          const {
            _id,
            duration,
            genre,
            language,
            posterUrl,
            rating,
            releaseDate,
            title,
          } = movieData;

          const response = await axios.post(
            `http://https://cineseatbackend.onrender.com/api/user/${currentUser._id}/favorites`,
            {
              movieData: {
                _id,
                duration,
                genre,
                language,
                posterUrl,
                rating,
                releaseDate,
                title,
              },
            }
          );

          const updatedUser = response.data.user;

          // Update user in store if available
          if (updatedUser) {
            set({ currentUser: updatedUser });
          }

          return response.data;
        } catch (error: any) {
          // Axios error formatting
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Adding to Favorites failed. Please try again.";

          throw new Error(message);
        }
      },

      // Remove to User Favorites
      removeToFavorites: async (currentUser: any, movieId: any) => {
        try {
          const response = await axios.delete(
            `http://https://cineseatbackend.onrender.com/api/user/${currentUser._id}/favorites`,
            {
              data: { movieId },
            }
          );

          const updatedUser = response.data.user;

          if (updatedUser) {
            set({ currentUser: updatedUser });
          }

          return response.data;
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Adding to Favorites failed. Please try again.";

          throw new Error(message);
        }
      },

      // Add User Watchlists
      addToWatchlists: async (currentUser: any, movieData: any) => {
        try {
          const {
            _id,
            duration,
            genre,
            language,
            posterUrl,
            rating,
            releaseDate,
            title,
          } = movieData;

          const response = await axios.post(
            `http://https://cineseatbackend.onrender.com/api/user/${currentUser._id}/watchlists`,
            {
              movieData: {
                _id,
                duration,
                genre,
                language,
                posterUrl,
                rating,
                releaseDate,
                title,
              },
            }
          );

          const updatedUser = response.data.user;

          // Update user in store if available
          if (updatedUser) {
            set({ currentUser: updatedUser });
          }

          return response.data;
        } catch (error: any) {
          // Axios error formatting
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Adding to Favorites failed. Please try again.";

          throw new Error(message);
        }
      },

      // Remove to User Watchlists
      removeToWatchlists: async (currentUser: any, movieId: any) => {
        try {
          const response = await axios.delete(
            `http://https://cineseatbackend.onrender.com/api/user/${currentUser._id}/watchlists`,
            {
              data: { movieId },
            }
          );

          const updatedUser = response.data.user;

          if (updatedUser) {
            set({ currentUser: updatedUser });
          }

          return response.data;
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Adding to Favorites failed. Please try again.";

          throw new Error(message);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
