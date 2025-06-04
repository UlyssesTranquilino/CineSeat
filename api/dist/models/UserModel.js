"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    movieId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    rating: { type: Number, min: 1, max: 10, required: true },
    review: { type: String },
    createdAt: { type: Date, default: Date.now },
});
const BookingSchema = new mongoose_1.default.Schema({
    movieDetails: { type: mongoose_1.default.Schema.Types.Mixed },
    showtimeId: { type: String },
    theaterName: { type: String },
    seats: [{ type: String }],
    totalPrice: { type: Number },
    bookingDate: { type: Date, default: Date.now },
    paymentMethod: { type: String },
    location: { type: String },
});
const FavoriteMovieSchema = new mongoose_1.default.Schema({
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
const WatchlistMovieSchema = new mongoose_1.default.Schema({
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
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    favorites: [FavoriteMovieSchema],
    watchlist: [WatchlistMovieSchema],
    reviews: [ReviewSchema],
    bookings: [BookingSchema],
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
