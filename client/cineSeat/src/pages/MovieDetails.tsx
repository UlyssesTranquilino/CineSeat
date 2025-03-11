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
        <div className="light:text-black">
          <div className=" rounded-md overflow-hidden relative text-left  h-55 sm:h-70 md:h-90 lg:h-100 ">
            <div
              className="absolute inset-0 left-10 z-4 "
              style={{
                backgroundImage: `url(${movie.backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 1, // Adjust opacity here (0 to 1)
                zIndex: -1, // Ensure the background is behind the content
              }}
            />

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute z-2 pl-[8%] pt-[5%] sm:pl-15 sm:pt-12 md:pt-17">
              <h1 className="text-2xl sm:text-4xl font-bold w-40 sm:w-80 text-left text-white">
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

              <div className="text-white flex items-center text-[13px] sm:text-[15px]">
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

            <div className="bg-gradient-to-r from-black to-transparent absolute z-1 h-full w-60 sm:w-100 md:w-160"></div>

            {/* <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="opacity-40 rounded-md ml-10 md:ml-25 imgBanner"
            /> */}
          </div>

          <div className="px-5 grid grid-cols-3">
            <div className="col-span-2">
              <div>
                <h1 className="font-bold text-left mt-20 sm:text-xl md:text-2xl ">
                  About the Movie
                </h1>
                <p className="text-left text-md lg:text-lg  mt-5">
                  {movie.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between  items-center mt-10">
                  <h1 className="font-bold text-left sm:text-xl md:text-2xl ">
                    Cast
                  </h1>
                  <button className="text-gray-400 cursor-pointer hover:text-yellow-400">
                    view more
                  </button>
                </div>
                <div className="flex items-center gap-5 mt-5 flex-wrap">
                  {movie.cast.slice(0, 5).map((cast: any) => (
                    <div
                      key={cast.id}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="rounded-full overflow-hidden w-18 h-18 flex items-center justify-center">
                        <img src={cast.profilePath} alt={cast.name} />
                      </div>
                      <h1 className="text-sm">{cast.name}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-50 rounded-md md:w-60 sm:ml-10"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default MovieDetails;
