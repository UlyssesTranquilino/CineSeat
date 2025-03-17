import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import PersonIcon from "@mui/icons-material/Person";

import SimilarMovies from "../components/SimilarMovies";

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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // 👈 This makes it immediate
      });
      fetchMovieDetails(id);
    }
  }, [id]);

  interface Review {
    username: string;
    review: string;
    rating: number;
  }

  const reviews: Review[] = [
    {
      username: "johndoe123",
      review:
        "Absolutely amazing movie! The story was gripping from start to finish, and the acting was top-notch.",
      rating: 9.5,
    },
    {
      username: "janedoe456",
      review:
        "It was decent, but not as good as I expected. The pacing was a bit slow in parts, and some characters were underdeveloped.",
      rating: 6.5,
    },
    {
      username: "sarah_98",
      review:
        "Terrible movie! The plot was incoherent, and the acting was wooden. Would not recommend it to anyone.",
      rating: 2.0,
    },
    {
      username: "mike_thebuilder",
      review:
        "Enjoyed it overall! A solid action movie with some great fight scenes, but the story was a bit predictable.",
      rating: 7.8,
    },
    {
      username: "emily_brown",
      review:
        "I was really disappointed. The movie was boring, and the ending felt rushed. It didn't live up to the hype.",
      rating: 4.0,
    },
  ];

  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}`;
  };

  return (
    <div>
      {isSuccess ? (
        <div className="light:text-black">
          <div className="rounded-md overflow-hidden relative text-left  h-55 sm:h-80 md:h-90 mt-3">
            <div
              className="absolute inset-0 left-10 z-4"
              style={{
                backgroundImage: `url(${movie.backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 1, // Adjust opacity here (0 to 1)
                zIndex: -1, // Ensure the background is behind the content
              }}
            />

            <div className="absolute z-2 pl-[8%] pt-[4%] sm:pl-15 sm:pt-10 md:pt-14 ">
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

                <p className="text-[12px] ml-3 mt-[2px] text-gray-300">
                  {movie.certification}
                </p>
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

              <h2 className="text-white flex items-center text-[13px] sm:text-[15px]">
                {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>

              <Link to={`/movie/ticket/${movie._id}`}>
                <button className="bg-[#FFD700] rounded-sm mt-4 w-24 sm:w-30 lg:w-40 text-xs sm:text-[14px] sm:mt-7 text-black cursor-pointer font-semibold p-1 md:text-md lg:text-lg hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out">
                  Book Tickets
                </button>
              </Link>
            </div>

            <div className="group-hover:hidden bg-gradient-to-r from-black to-transparent absolute z-1 h-full w-90 sm:w-140 md:w-160"></div>

            {/* <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="opacity-40 rounded-md ml-10 md:ml-25 imgBanner"
            /> */}
          </div>

          <div className="px-5">
            <h1 className="font-bold text-left mt-20 text-xl md:text-2xl">
              Trailer
            </h1>
            <iframe
              src={getEmbedUrl(movie.trailerUrl)}
              className="w-full h-70 rounded-lg mt-10 md:h-80"
              title="Trailer"
              allow="encrypted-media"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          <div className="px-5  grid grid-cols-4">
            <div className="col-span-4 sm:col-span-3">
              <div>
                <h1 className="font-bold text-left mt-20 text-xl md:text-2xl ">
                  About the Movie
                </h1>
                <p className="text-left text-sm sm:text-md   mt-5 sm:pr-5">
                  {movie.description}
                </p>

                <div className="my-15 flex items-start justify-center sm:hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-50 rounded-md md:w-60 sm:ml-10"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between  items-center mt-10 md:mt-20">
                  <h1 className="font-bold text-left sm:text-xl md:text-2xl ">
                    Cast
                  </h1>
                  <button className="text-gray-400 cursor-pointer hover:text-yellow-400 sm:mr-10">
                    view more
                  </button>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-10 mt-5 flex-wrap">
                  {movie.cast.slice(0, 10).map((cast: any) => (
                    <div
                      key={cast.id}
                      className="flex flex-col items-center gap-2 w-20 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="rounded-full overflow-hidden w-18 h-18 flex items-center justify-center">
                        <img
                          src={cast.profilePath}
                          alt={cast.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h1 className="w-25 text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap">
                        {cast.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between  items-center mt-10 ">
                  <h1 className="font-bold text-left sm:text-xl md:text-2xl ">
                    Crew
                  </h1>
                  <button className="text-gray-400 cursor-pointer hover:text-yellow-400 sm:mr-10">
                    view more
                  </button>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-10 mt-5 flex-wrap">
                  {movie.crew.slice(0, 6).map((cast: any) => (
                    <div
                      key={cast.id}
                      className="flex flex-col items-center gap-2 w-20 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="rounded-full overflow-hidden w-18 h-18 flex items-center justify-center">
                        <img src={cast.profilePath} alt={cast.name} />
                      </div>
                      <h1 className="w-25 text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap">
                        {cast.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 sm:flex items-start justify-end hidden ">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-50 rounded-md md:w-60 sm:ml-10"
              />
            </div>
          </div>

          <div className="px-5 ">
            <h1 className="font-bold text-left mt-20 text-xl md:text-2xl ">
              Critic Reviews
            </h1>

            <div className="grid sm:grid-cols-2 gap-10 lg:gap-15 mt-10">
              {reviews.map((review) => (
                <div
                  key={review.username}
                  className="border-1 border-gray-400 rounded-sm p-5 bg-[rgba(0,0,0,0.4)] light:bg-gray-100 light:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-800 light:bg-white flex items-center justify-center">
                        <PersonIcon />
                      </div>

                      <h1>{review.username}</h1>
                    </div>

                    <div className="flex items-center gap-[2px]">
                      <Rating
                        name="read-only"
                        value={movie.rating.value / 5}
                        readOnly
                        precision={0.5}
                        max={1}
                        size="medium"
                        className="scale-80"
                      />
                      <p className="text-md text-yellow-400 mt-[1px]">
                        {review.rating}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm mt-10 text-left mb-5">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5">
            <SimilarMovies genre={movie.genre} title={movie.title} />
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default MovieDetails;
