import { useState, useEffect } from "react";
import { useMovieStore } from "../global/mode";

//Components
import MoviesCarousel from "../components/Home/MoviesCarousel";
import NowShowing from "./NowShowing";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [carouselMovies, setCarouselMovies] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { movies, fetchMovies } = useMovieStore() as {
    movies: any[];
    fetchMovies: () => void;
  };

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      console.log("Calling to fetch");
      await fetchMovies(); // ✅ Await it to ensure state updates before continuing
      console.log("Movies updated: ", movies);
    };
    fetchAndSetMovies();
  }, [fetchMovies]);

  useEffect(() => {
    console.log("✅ Movies updated in state:", movies);
  }, [movies]);

  useEffect(() => {
    console.log("Movies updated: ", movies);
    setCarouselMovies(movies.slice(0, 8));
    setIsSuccess(true);
  }, [movies]);

  return (
    <div className="text-white light:text-black">
      {isSuccess && movies.length > 0 && <MoviesCarousel />}
      <NowShowing />
    </div>
  );
};

export default HomePage;
