import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import Movie from "../models/movie";

dotenv.config();

// List of Theaters with Random Locations
const theaters = [
  { name: "SM", location: "Manila" },
  { name: "SM", location: "Cebu" },
  { name: "SM", location: "Davao" },
  { name: "Robinson", location: "Quezon City" },
  { name: "Robinson", location: "Iloilo" },
  { name: "Robinson", location: "Bacolod" },
  { name: "VistaMall", location: "Taguig" },
  { name: "VistaMall", location: "Las Piñas" },
  { name: "VistaMall", location: "Batangas" },
];

const GENRE_MAP: any = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
};

interface Showtime {
  theaterName: string;
  location: string;
  screen: number;
  startTime: Date;
  endTime: Date;
  availableSeats: number;
  price: number;
}

const generateShowtimes = (duration: number): Showtime[] => {
  const showtimes: Showtime[] = [];
  const numShowtimes = Math.floor(Math.random() * 3) + 2; // 2 to 4 showtimes per movie

  for (let i = 0; i < numShowtimes; i++) {
    const randomTheater = theaters[Math.floor(Math.random() * theaters.length)];

    const startTime = new Date();
    startTime.setHours(10 + Math.floor(Math.random() * 10), 0, 0, 0); // Between 10 AM - 8 PM

    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + duration);

    showtimes.push({
      theaterName: randomTheater.name, // Store theater name
      location: randomTheater.location, // Store theater location
      screen: Math.floor(Math.random() * 5) + 1,
      startTime,
      endTime,
      availableSeats: Math.floor(Math.random() * 50) + 50,
      price: Math.floor(Math.random() * 200) + 200,
    });
  }

  return showtimes;
};

// Fetch & Store Movies from TMDb API
const fetchAndStoreMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=5`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    const movies = await Promise.all(
      response.data.results.map(async (movie: any) => {
        try {
          // Fetch trailers for each movie
          const movieVid = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
              },
            }
          );

          // Find the trailer video
          const trailer = movieVid.data.results.find(
            (video: any) => video.type === "Trailer"
          );

          const clip = movieVid.data.results.find(
            (video: any) => video.type === "Clip"
          );

          return {
            title: movie.title,
            description: movie.overview,
            releaseDate: movie.release_date,
            genre: movie.genre_ids.join(", "),
            duration: movie.runtime || 120, // Default to 120 min if missing
            language: movie.original_language,
            backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            posterUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            trailerUrl: trailer
              ? `https://www.youtube.com/watch?v=${trailer.key}`
              : "none",
            certification: "PG-13", // Placeholder, can be fetched separately
            showtimes: generateShowtimes(movie.runtime || 120),
          };
        } catch (err) {
          console.error(
            `Error fetching trailer for movie ${movie.title}:`,
            err
          );
          return null; // Skip the movie if trailer fetching fails
        }
      })
    );

    // Filter out null values (failed fetches)
    const validMovies = movies.filter((movie) => movie !== null);

    await Movie.insertMany(validMovies);
    console.log("✅ Movies with showtimes stored in MongoDB!");
  } catch (error) {
    console.error("❌ Error fetching or storing movies:", error);
  } finally {
    mongoose.connection.close();
  }
};

const getBiasedRating = () => {
  return (Math.pow(Math.random(), 0.5) * 9 + 1).toFixed(1); // Generates 1 decimal place
};

const updateMoviesWithRating = async () => {
  try {
    const movies = await Movie.find({}); // Fetch all movies

    for (const movie of movies) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            movie.title
          )}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjRkZjNmZmY3OGRlNzBiMjg0Njc4YWMyNDBlZDRlYSIsIm5iZiI6MTczOTUzNDM5OS40NzcsInN1YiI6IjY3YWYzMDNmNmQxYTdiNjA1MjNiNjg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r0BF7YjaupWfLFb6HUPQVagV0cERCUTS-nCQeMZ65WY",
            },
          }
        );

        if (response.data.results.length > 0) {
          const correctMovie = response.data.results[0];
          const genreIds = correctMovie.genre_ids;

          await Movie.updateOne(
            { _id: movie._id },
            { $set: { genre: genreIds } }
          );

          console.log(`✅ Updated "${movie.title}" with genres:`, genreIds);
        } else {
          console.warn(`⚠️ No match found for "${movie.title}"`);
        }
      } catch (err) {
        console.error(`❌ Error updating `);
      }
    }
  } catch (error) {
    console.error("❌ Error updating movies:", error);
  } finally {
    mongoose.connection.close();
  }
};

const updateMoviesWithGenres = async () => {
  try {
    const movies = await Movie.find({});

    for (const movie of movies) {
      if (!Array.isArray(movie.genre)) {
        console.warn(`⚠️ Skipping "${movie.title}" - genre field is invalid.`);
        continue;
      }

      // Convert ID strings to genre names
      const genreNames = movie.genre.map((id) => GENRE_MAP[id] || "Unknown");

      // Update movie in MongoDB
      await Movie.updateOne(
        { _id: movie._id },
        { $set: { genre: genreNames } }
      );

      console.log(`✅ Updated "${movie.title}" genres:`, genreNames);
    }

    console.log("Genres updated");
  } catch (error) {
    console.error("❌ Error updating movie genres:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
export default updateMoviesWithGenres;
