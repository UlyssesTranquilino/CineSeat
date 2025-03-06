import express from "express";
import { getMovies, getMovieById } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.get("/", getMovies);

export default movieRouter;
