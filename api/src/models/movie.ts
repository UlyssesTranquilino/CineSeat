import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: String, required: true },
  genre: [{ type: String, required: true }],
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  posterUrl: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  certification: { type: String, required: true },
  backdropUrl: { type: String, required: true },
  showtimes: [
    {
      theaterName: { type: String, required: true },
      location: { type: String, required: true },
      screen: { type: Number, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      availableSeats: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  rating: {
    value: { type: Number, min: 1, max: 10 }, // Decimal rating between 1 and 10
    source: { type: String, default: "Generated" }, // Default source
  },
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
