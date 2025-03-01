import { useState, useEffect } from "react";
import { useMovieStore } from "../global/mode";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, fetchMovies } = useMovieStore() as {
    movies: any[];
    fetchMovies: () => void;
  };

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      await fetchMovies();
    };
    fetchAndSetMovies();
  }, [fetchMovies]);

  useEffect(() => {
    console.log("Movies updated: ", movies);
  }, [movies]);

  return (
    <div className="text-white light:text-black">
      <div></div>HomePage MOvies
    </div>
  );
};

export default HomePage;
