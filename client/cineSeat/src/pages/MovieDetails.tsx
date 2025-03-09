import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

const MovieDetails = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchMovieDetails = async (id: string) => {
    const res = await fetch(`http://localhost:5000/${id}`);

    const { data, success } = await res.json();
    setIsSuccess(success);
    setMovie(data);
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  return (
    <div>
      {isSuccess ? (
        <div>
          <div className="bg-black rounded-md overflow-hidden relative text-left md:h-140 ">
            <div className="absolute z-2 pl-[8%] pt-[5%] sm:pl-15 sm:pt-30">
              <h1 className="text-2xl sm:text-4xl font-bold w-40 sm:w-80 text-left">
                {movie.title}
              </h1>
              <div className="flex items-center justify-start gap-[1px] -translate-x-1 sm:translate-x-4 sm:scale-110 sm:mt-1">
                <Rating
                  name="read-only"
                  value={movie.rating.value / 5}
                  readOnly
                  precision={0.5}
                  max={1}
                  size="small"
                  className="scale-80"
                />
                <p className="text-xs text-yellow-400 mt-[1px]">
                  {movie.rating.value}
                </p>

                <div className="text-[12px] ml-[5px] mt-[2px]">
                  <p className="text-gray-400">({movie.rating.reviewsCount})</p>
                </div>
              </div>

              <div className="mt-2 text-gray-400 text-xs flex items-center gap-2 sm:text-[14px] sm:mt-5">
                <p>{movie.language.toUpperCase()}</p>
                <p>2h and 3m</p>
              </div>

              <div className="flex items-center text-[13px] sm:text-[15px]">
                {movie.genre.map((genre: string, index: number) => (
                  <p key={genre} className="pr-1">
                    {genre}
                    {index < movie.genre.length - 1 && ", "}
                  </p>
                ))}
              </div>

              <button className="bg-[#FFD700] rounded-sm mt-4 w-24 sm:w-30 lg:w-40 text-xs sm:text-[14px] sm:mt-7 text-black cursor-pointer font-semibold p-1 md:text-md lg:text-lg hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out">
                Book Tickets
              </button>
            </div>

            <div className="bg-gradient-to-r from-black to-transparent absolute z-1 h-full w-60 sm:w-80 md:w-160"></div>

            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="opacity-40 rounded-md ml-10 md:ml-25"
            />
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default MovieDetails;
