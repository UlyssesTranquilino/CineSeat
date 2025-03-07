import { useState, useMemo } from "react";
import { useMovieStore } from "../global/mode";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";

const NowShowing = () => {
  const { movies }: { movies: any } = useMovieStore();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    rows: 2,
    indicators: false,
  };

  const genres = [
    "All", // Added to allow users to see all movies
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
  ];

  const [activeGenre, setActiveGenre] = useState("All");

  // Memoize filtered movies
  const filteredMovies = useMemo(() => {
    if (activeGenre === "All") return movies.slice(6, 80);
    return movies
      .slice(6, 80)
      .filter((movie: any) => movie.genre.includes(activeGenre));
  }, [movies, activeGenre]);

  return (
    <div className="pt-15 sm:px-5 pb-20">
      <h1 className="text-left text-xl font-bold mb-8">Now Showing</h1>

      {/* Genre Selection */}
      <div className="mb-15">
        <Slider {...settings}>
          {genres.map((genre) => (
            <div key={genre} className="px-2 my-1">
              <button
                onClick={() => setActiveGenre(genre)}
                className={`px-2 rounded-lg my-1 h-11 font-semibold transition-all w-full cursor-pointer ${
                  activeGenre === genre
                    ? "bg-[#FFD700] text-black"
                    : "bg-[#1A1A1A] light:bg-gray-200 light:text-black text-gray-300 hover:bg-[#303030] light:hover:bg-gray-300 hover:text-white light:hover:text-black"
                }`}
              >
                {genre}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-7 rounded-sm">
        {filteredMovies.map((movie: any) => (
          <div
            key={movie._id}
            className="mb-10 rounded-sm overflow-hidden bg-black relative h-full"
          >
            <div className="overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="object-cover"
              />
            </div>

            <div className="bg-black flex flex-col justify-between py-4 px-4 h-20 absolute bottom-0 w-full">
              <h1 className="text-left font-semibold text-white truncate w-full overflow-hidden whitespace-nowrap">
                {movie.title}
              </h1>

              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center truncate overflow-hidden whitespace-nowrap">
                  {movie.genre.map((genre: string, index: number) => (
                    <p key={genre} className="mr-1 text-sm mt-1">
                      {genre}
                      {index !== movie.genre.length - 1 ? ", " : ""}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Rating
                    name="read-only"
                    value={movie.rating.value / 5}
                    readOnly
                    precision={0.5}
                    max={1}
                    size="small"
                  />
                  <p className="text-sm text-yellow-400 mt-[1px]">
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
