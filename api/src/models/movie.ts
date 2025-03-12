import mongoose from "mongoose";

const CastSchema = new mongoose.Schema({
  adult: { type: Boolean, required: true },
  gender: { type: Number },
  id: { type: Number, required: true },
  knownForDepartment: { type: String },
  name: { type: String, required: true },
  originalName: { type: String },
  popularity: { type: Number },
  profilePath: { type: String },
  castId: { type: Number },
  character: { type: String },
  creditId: { type: String },
  order: { type: Number },
});

const CrewSchema = new mongoose.Schema({
  adult: { type: Boolean, required: true },
  gender: { type: Number },
  id: { type: Number, required: true },
  knownForDepartment: { type: String },
  name: { type: String, required: true },
  originalName: { type: String },
  popularity: { type: Number },
  profilePath: { type: String },
  creditId: { type: String },
  department: { type: String },
  job: { type: String },
});

const ShowTimeSchema = new mongoose.Schema({
  theaterName: { type: String, required: true },
  location: { type: String, required: true },
  screen: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
});

const RatingSchema = new mongoose.Schema({
  value: { type: Number, min: 1, max: 10 },
  source: { type: String, default: "Generated" },
  reviewsCount: { type: Number, default: 0 },
});

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
  showtimes: [ShowTimeSchema],
  rating: RatingSchema,
  cast: [CastSchema],
  crew: [CrewSchema],
  movieDatabaseID: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
