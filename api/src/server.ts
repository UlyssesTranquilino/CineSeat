import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import movieRouter from "./routes/movieRoutes";
import userRouter from "./routes/user.route";
import authRouter from "./routes/authRoutes";

import updateMoviesWithRating from "./config/db";
import updateMoviesWithGenres from "./config/db";
import addReviewCount from "./config/db";
import addCastsAndCrews from "./config/db";
import addMovieDatabaseID from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/user", userRouter);

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("❌ MongoDB URI is not defined in environment variables");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("❌ MongoDB Connection Error:", error));

// API Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
