import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

import { useUserStore } from "../../global/mode";

const ProfileFavorites = () => {
  const { currentUser } = useUserStore();
  const movieFavorites = currentUser.favorites;

  return (
    <div>
      <h1 className="font-semibold text-xl md:text-2xl text-left mt-7">
        My Favorites
      </h1>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 rounded-sm mt-10">
        {movieFavorites.map((movie: any) => (
          <Link to={`/movie/${movie._id}`} key={movie._id}>
            <div className="mb-10 rounded-sm overflow-hidden bg-black relative h-full cursor-pointer hover:opacity-80 hover:scale-105  transition-all duration-300 group">
              <div className="overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="object-cover"
                />
              </div>

              <div className="bg-black light:bg-gray-200  flex flex-col justify-between py-4 px-2 h-20 absolute bottom-0 w-full">
                <h1 className="text-left font-semibold text-white light:text-black truncate w-full overflow-hidden whitespace-nowrap">
                  {movie.title}
                </h1>

                <div className="flex items-center justify-between text-gray-400 light:text-gray-700 gap-2">
                  <div className="flex items-center truncate overflow-hidden whitespace-nowrap">
                    {movie.genre.map((genre: string, index: number) => (
                      <p key={genre} className="mr-1 text-sm mt-1">
                        {genre}
                        {index !== movie.genre.length - 1 ? ", " : ""}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-[2px]">
                    <Rating
                      name="read-only"
                      value={movie.rating.value / 5}
                      readOnly
                      precision={0.5}
                      max={1}
                      size="small"
                    />
                    <p className="text-sm text-yellow-400 light:text-yellow-500 mt-[1px]">
                      {movie.rating.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileFavorites;
