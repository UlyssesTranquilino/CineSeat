import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMovieStore } from "../../global/mode";
import { useUserStore } from "../../global/mode";
import { Link, useNavigate } from "react-router-dom";

const MoviesCarousel = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const { movies } = useMovieStore() as {
    movies: any[];
  };

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Hanlde Book Ticket
  const handleBookTicket = (movieId: string) => (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
    } else navigate(`/movie/ticket/${movieId}`);
  };

  return (
    <div className="w-full rounded-sm movie-carousel">
      <Slider {...settings}>
        {movies.slice(0, 5).map((movie) => (
          <div
            className="relative h-70 md:h-100 bg-black overflow-hidden rounded-md"
            key={movie._id}
          >
            <div
              className="absolute w-60 md:100 md:w-200 pl-5 sm:pl-20 z-1 flex flex-col gap-10 justify-center pb-8 h-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(66,94,136,0) 100%)",
              }}
            >
              <Link to={`/movie/${movie._id}`}>
                <h1 className="font-bold text-left text-3xl md:text-4xl lg:text-5xl w-70 text-white ">
                  {movie.title}
                </h1>
              </Link>

              <div className="z-10 flex items-start">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!currentUser) {
                      navigate("/login");
                    } else {
                      navigate(`/movie/ticket/${movie._id}`);
                    }
                  }}
                  className="bg-[#FFD700] rounded-sm w-30 md:w-35 lg:w-40 text-sm text-black cursor-pointer font-semibold p-1 md:text-md lg:text-lg hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out"
                >
                  Book Tickets
                </button>
              </div>
            </div>
            <Link to={`/movie/${movie._id}`}>
              <img
                src={movie.backdropUrl}
                alt={movie._title}
                className="object-cover md:pl-60 opacity-50 h-full w-full"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MoviesCarousel;
