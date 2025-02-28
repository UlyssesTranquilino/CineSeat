import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  posterUrl: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  certification: { type: String, required: true },
  backdropUrl: { type: String, required: true },
  showtimes: [
    {
      theaterName: { type: String, required: true }, // Store theater name instead
      location: { type: String, required: true }, // Store theater location
      screen: { type: Number, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      availableSeats: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
