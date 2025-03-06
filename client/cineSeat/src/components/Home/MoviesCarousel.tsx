import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMovieStore } from "../../global/mode";
import { useTheme } from "@emotion/react";
const MoviesCarousel = () => {
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

  return (
    <div className="w-full">
      <Slider {...settings}>
        {movies.slice(0, 5).map((movie) => (
          <div
            key={movie._id}
            className="relative h-70 md:h-100 bg-black overflow-hidden"
          >
            <div
              className="absolute  w-60 h-80 md:100 md:w-200 pl-20 z-1 flex flex-col gap-10  justify-center pb-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(66,94,136,0) 100%)",
              }}
            >
              <h1 className="font-bold text-left text-3xl md:text-4xl lg:text-5xl w-70 text-white">
                {movie.title}
              </h1>
              <button className="bg-[#FFD700] rounded-sm md:w-35 lg:w-40 text-black cursor-pointer font-semibold p-1 md:text-md lg:text-lg hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out">
                Book Tickets
              </button>
            </div>
            <img
              src={movie.backdropUrl}
              alt={movie._title}
              className="object-cover md:pl-60 opacity-50"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MoviesCarousel;
