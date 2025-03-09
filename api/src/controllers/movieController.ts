import Movie from "../models/movie";
import { Request, Response } from "express";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json({ data: movies });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.status(200).json({ success: true, data: movie });
  } catch (error: any) {
    console.error("ERROR: ", error);
    res.status(404).json({ success: false, message: "Movie Not Found" });
  }
};
