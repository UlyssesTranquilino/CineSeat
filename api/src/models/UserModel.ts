import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  rating: { type: Number, min: 1, max: 10, required: true },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const BookingSchema = new mongoose.Schema({
  movieDetails: { type: mongoose.Schema.Types.Mixed },
  showtimeId: { type: String },
  theaterName: { type: String },
  seats: [{ type: String }],
  totalPrice: { type: Number },
  bookingDate: { type: Date, default: Date.now },
  paymentMethod: { type: String },
  location: { type: String },
});

const FavoriteMovieSchema = new mongoose.Schema({
  movieId: { type: String },
  duration: { type: Number },
  genre: [{ type: String }],
  language: { type: String },
  posterUrl: { type: String },
  rating: {
    value: { type: Number },
    source: { type: String },
    reviewsCount: { type: Number },
  },
  releaseDate: { type: String },
  title: { type: String },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  favorites: [FavoriteMovieSchema],
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  reviews: [ReviewSchema],
  bookings: [BookingSchema],

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
