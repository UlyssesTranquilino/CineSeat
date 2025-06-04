import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovieStore } from "../global/mode";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";

const NowShowing = () => {
  const { id } = useParams();
  const { movies }: { movies: any } = useMovieStore();

  const [width, setWidth] = useState(window.innerWidth);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Fetch new movie data based on ID change
  }, [id]); // 👈 Watch for ID changes

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: width <= 720 ? 3 : 7,
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

  // Shuffle List
  const shuffleArray = (array: []) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  // Memoize filtered movies
  const filteredMovies = useMemo(() => {
    const sliced = movies.slice(6, 80);

    if (activeGenre === "All") return shuffleArray(sliced);

    const filtered = sliced.filter((movie: any) =>
      movie.genre.includes(activeGenre)
    );

    return shuffleArray(filtered);
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
                className={`px-2 rounded-lg my-1 h-11 font-semibold transition-all w-full cursor-pointer text-sm ${
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 rounded-sm">
        {filteredMovies.map((movie: any) => (
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
    </div>
  );
};

export default NowShowing;
