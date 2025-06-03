import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useUserStore } from "../../global/mode";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmptyWatchlistImg from "../../assets/Empty Watchlist.png";

const ProfileWatchlists = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const movieWatchlists = currentUser.watchlist;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="px-3">
      <div
        onClick={handleBackClick}
        className="flex items-start light:text-gray-400 text-gray-500 cursor-pointer py-2 pl-1 mt-1  light:hover:bg-gray-100 light:hover:text-gray-500  hover:bg-gray-900/50 hover:text-gray-200 w-20 rounded-sm transition-all duration-200 ease-in-out "
      >
        <ArrowBackIosIcon className="scale-80" />
        Back
      </div>

      <h1 className="font-semibold light:text-black text-white text-xl md:text-2xl text-left mt-4">
        My Watchlists
      </h1>

      {/* Movie Grid */}
      {movieWatchlists.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 rounded-sm mt-10">
          {movieWatchlists.map((movie: any) => (
            <Link to={`/movie/${movie._id}`} key={movie._id}>
              <div className="mb-10 rounded-sm overflow-hidden bg-black relative h-full cursor-pointer hover:opacity-80 hover:scale-105  transition-all duration-300 group">
                <div className="overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="object-cover"
                  />
                </div>

                <div className="bg-black light:bg-gray-100  flex flex-col justify-between py-4 px-2 h-20 absolute bottom-0 w-full">
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
                      <p className="text-sm text-yellow-400 light:text-yellow-600 mt-[1px]">
                        {movie.rating.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <img
            src={EmptyWatchlistImg}
            alt="Empty Favorite"
            className="light:opacity-50 opacity-90 w-65 md:w-75 mx-auto"
          />
          <div className="mt-2 mb-15">
            <h1 className="text-2xl mg:text-4xl font-semibold light:text-black ">
              No Watchlists Yet
            </h1>
            <p className="light:text-gray-600 px-10 text-gray-200 mt-3 md:text-lg">
              You can add a movie to your watchlists by clicking the "Add to
              Watchlist" Icon
            </p>
          </div>
          <Link
            to="/"
            className="cursor-pointer bg-red-700 light:bg-red-600  p-3 px-2 sm:px-5 md:px-7 rounded-md font-semibold hover:shadow-lg shadow-red-500/50 light:shadow-red-500/30  transition-all duration-300 ease-in-out"
          >
            Explore Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileWatchlists;
