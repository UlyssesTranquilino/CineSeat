// import dotenv from "dotenv";
// import axios from "axios";
// import mongoose from "mongoose";
// import Movie from "../models/movie";

// dotenv.config();

// // List of Theaters with Random Locations
// const theaters = [
//   { name: "SM", location: "Manila" },
//   { name: "SM", location: "Cebu" },
//   { name: "SM", location: "Davao" },
//   { name: "Robinson", location: "Quezon City" },
//   { name: "Robinson", location: "Iloilo" },
//   { name: "Robinson", location: "Bacolod" },
//   { name: "VistaMall", location: "Taguig" },
//   { name: "VistaMall", location: "Las Piñas" },
//   { name: "VistaMall", location: "Batangas" },
// ];

// interface Showtime {
//   theaterName: string;
//   location: string;
//   screen: number;
//   startTime: Date;
//   endTime: Date;
//   availableSeats: number;
//   price: number;
// }

// const generateShowtimes = (duration: number): Showtime[] => {
//   const showtimes: Showtime[] = [];
//   const numShowtimes = Math.floor(Math.random() * 3) + 2; // 2 to 4 showtimes per movie

//   for (let i = 0; i < numShowtimes; i++) {
//     const randomTheater = theaters[Math.floor(Math.random() * theaters.length)];

//     const startTime = new Date();
//     startTime.setHours(10 + Math.floor(Math.random() * 10), 0, 0, 0); // Between 10 AM - 8 PM

//     const endTime = new Date(startTime);
//     endTime.setMinutes(startTime.getMinutes() + duration);

//     showtimes.push({
//       theaterName: randomTheater.name, // Store theater name
//       location: randomTheater.location, // Store theater location
//       screen: Math.floor(Math.random() * 5) + 1,
//       startTime,
//       endTime,
//       availableSeats: Math.floor(Math.random() * 50) + 50,
//       price: Math.floor(Math.random() * 200) + 200,
//     });
//   }

//   return showtimes;
// };

// // Fetch & Store Movies from TMDb API
// const fetchAndStoreMovies = async () => {
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=5`,
//       {
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
//         },
//       }
//     );

//     const movies = await Promise.all(
//       response.data.results.map(async (movie: any) => {
//         try {
//           // Fetch trailers for each movie
//           const movieVid = await axios.get(
//             `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
//             {
//               headers: {
//                 accept: "application/json",
//                 Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
//               },
//             }
//           );

//           // Find the trailer video
//           const trailer = movieVid.data.results.find(
//             (video: any) => video.type === "Trailer"
//           );

//           const clip = movieVid.data.results.find(
//             (video: any) => video.type === "Clip"
//           );

//           return {
//             title: movie.title,
//             description: movie.overview,
//             releaseDate: movie.release_date,
//             genre: movie.genre_ids.join(", "),
//             duration: movie.runtime || 120, // Default to 120 min if missing
//             language: movie.original_language,
//             backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
//             posterUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
//             trailerUrl: trailer
//               ? `https://www.youtube.com/watch?v=${trailer.key}`
//               : "none",
//             certification: "PG-13", // Placeholder, can be fetched separately
//             showtimes: generateShowtimes(movie.runtime || 120),
//           };
//         } catch (err) {
//           console.error(
//             `Error fetching trailer for movie ${movie.title}:`,
//             err
//           );
//           return null; // Skip the movie if trailer fetching fails
//         }
//       })
//     );

//     // Filter out null values (failed fetches)
//     const validMovies = movies.filter((movie) => movie !== null);

//     await Movie.insertMany(validMovies);
//     console.log("✅ Movies with showtimes stored in MongoDB!");
//   } catch (error) {
//     console.error("❌ Error fetching or storing movies:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// // Run the script
// export default fetchAndStoreMovies;
