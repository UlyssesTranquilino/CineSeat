import { useState } from "react";
import { useMovieStore } from "../global/mode";

import Rating from "@mui/material/Rating";

const NowShowing = () => {
  const { movies } = useMovieStore();

  return (
    <div className="pt-15  sm:px-5">
      <h1 className="text-left text-xl font-bold mb-10">Now Showing</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-7 rounded-sm">
        {movies.slice(6, 20).map((movie) => (
          <div key={movie._id} className="mb-10 rounded-sm  overflow-hidden">
            <img
              src={movie.posterUrl}
              alt={movie._title}
              className="object-cover "
            />

            <div className="bg-black flex flex-col  justify-between  py-4 px-4">
              <h1 className="text-left font-semibold">{movie.title}</h1>

              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center">
                  {movie.genre.map((genre: string, index: number) => (
                    <p key={genre} className="mr-1 text-sm mt-1">
                      {genre}
                      {index != movie.genre.length - 1 ? ", " : ""}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Rating
                    name="read-only"
                    value={movie.rating.value / 5}
                    readOnly
                    precision={0.5}
                    max={1}
                    size="small"
                  />
                  <p className="text-sm text-yellow-400">
                    {movie.rating.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowShowing;
