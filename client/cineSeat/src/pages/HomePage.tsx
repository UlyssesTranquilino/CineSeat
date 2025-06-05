import { useState, useEffect } from "react";
import { useMovieStore } from "../global/mode";

//Components
import MoviesCarousel from "../components/Home/MoviesCarousel";
import NowShowing from "./NowShowing";

import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery } from "@mui/material";

const HomePage = () => {
  const [carouselMovies, setCarouselMovies] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { movies, fetchMovies } = useMovieStore() as {
    movies: any[];
    fetchMovies: () => void;
  };

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      await fetchMovies(); // ✅ Await it to ensure state updates before continuing
    };
    fetchAndSetMovies();
  }, [fetchMovies]);

  useEffect(() => {}, [movies]);

  useEffect(() => {
    setCarouselMovies(movies.slice(0, 8));
    setIsSuccess(true);
  }, [movies]);

  const isMediumUp = useMediaQuery("(min-width: 768px)"); // Tailwind's md breakpoint

  const length = isMediumUp ? 14 : 6;

  return (
    <div>
      {isSuccess && movies.length > 0 ? (
        <div className="text-white light:text-black">
          {isSuccess && movies.length > 0 && <MoviesCarousel />}
          <NowShowing />
        </div>
      ) : (
        <div className="text-white light:text-black">
          <div className=" w-full h-70 md:h-100 flex-shrink-0 overflow-hidden light:bg-gray-50 bg-gray-800/80 rounded-sm">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="100%"
            />
          </div>

          <div className=" mt-20  w-32 h-9  flex-shrink-0 overflow-hidden light:bg-gray-50 bg-gray-800/80 rounded-sm">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="100%"
            />
          </div>

          <div className="mt-10 grid grid-cols-3 md:grid-cols-7  gap-3 rounded-sm">
            {Array.from({ length }).map((_, index) => (
              <div
                key={index}
                className=" w-full h-11 flex-shrink-0 overflow-hidden light:bg-gray-50 bg-gray-800/80 rounded-sm"
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height="100%"
                />
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 rounded-sm">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className=" w-full h-90 lg:h-100 flex-shrink-0 overflow-hidden light:bg-gray-50 bg-gray-800/80 rounded-sm"
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height="100%"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
