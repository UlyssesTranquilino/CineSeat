"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CastSchema = new mongoose_1.default.Schema({
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
const CrewSchema = new mongoose_1.default.Schema({
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
const ShowTimeSchema = new mongoose_1.default.Schema({
    theaterName: { type: String, required: true },
    location: { type: String, required: true },
    screen: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
});
const RatingSchema = new mongoose_1.default.Schema({
    value: { type: Number, min: 1, max: 10 },
    source: { type: String, default: "Generated" },
    reviewsCount: { type: Number, default: 0 },
});
const MovieSchema = new mongoose_1.default.Schema({
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
const Movie = mongoose_1.default.model("Movie", MovieSchema);
exports.default = Movie;
