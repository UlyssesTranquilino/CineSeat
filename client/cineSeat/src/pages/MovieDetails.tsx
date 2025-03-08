import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
          <div className="bg-black">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="opacity-40"
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
