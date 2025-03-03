import React from "react";
import { useMovieStore } from "../global/mode";

const NowShowing = () => {
  const { movies } = useMovieStore();
  return (
    <div className="pt-15">
      <h1 className="text-left text-xl font-bold">Now Showing</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7 rounded-sm">
        {movies.slice(6, 20).map((movie) => (
          <div key={movie._id}>
            <img
              src={movie.posterUrl}
              alt={movie._title}
              className="object-cover "
            />

            <div className="bg-black p-1 py-3">
              <h1 className="text-left">{movie.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowShowing;
