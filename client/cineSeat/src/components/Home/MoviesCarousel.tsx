import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMovieStore } from "../../global/mode";
const MoviesCarousel = () => {
  const { movies } = useMovieStore() as {
    movies: any[];
  };

  console.log("MOVIES: ", movies);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full ">
      <Slider {...settings}>
        {movies.slice(0, 5).map((movie) => (
          <div key={movie._id} className="relative max-h-[450px bg-black">
            <div
              className="absolute h-full w-200 pt-30 pl-20 z-1 flex flex-col gap-5"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(66,94,136,0) 100%)",
              }}
            >
              <h1 className="font-bold text-left text-3xl">{movie.title}</h1>
              <button className="bg-[#FFD700] rounded-sm w-40 text-black font-semibold p-1 text-lg">
                Book Tickets
              </button>
            </div>
            <img
              src={movie.backdropUrl}
              alt={movie._title}
              className="object-cover pl-60 opacity-50"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MoviesCarousel;
