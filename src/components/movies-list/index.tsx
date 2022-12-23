import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface MovieType {
  movieId: number;
  name: string;
  type: string;
  image: string;
  rating: number;
  description: string;
}

const MoviesList = () => {
  const [displayedMovies, setDisplayedMovies] = useState<MovieType[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setDisplayedMovies(data));
  }, []);

  const goToPrevious = () => {
    const [firstElement, ...rest] = displayedMovies
    setDisplayedMovies([...rest, firstElement])
  };

  const goToNext = () => {
    const lastElement = displayedMovies.slice(-1)[0]
    setDisplayedMovies([lastElement, ...displayedMovies.slice(0,-1)])
  };


  return (
    <>
    <div className="information">
    <h2 className="all-film-title">Wszystkie filmy w repertuarze:</h2>
    <div className="aside-button-left" onClick={goToPrevious}><img src={require("../../assets/left.png")} alt="LEFT"></img></div>
    <div className="aside-button-right" onClick={goToNext}><img src={require("../../assets/right.png")} alt="RIGHT"></img></div>
    </div>
    <div className="favorites-films">
      <div className="films">
      {displayedMovies.map((movie) => (
          <div key={movie.movieId}>
            <Link to={`/movies/${movie.movieId}`}>
              <img src={`${process.env.REACT_APP_SERVER_BASE}${movie.image}`} alt={movie.name}></img>
            </Link>
          </div>
      ))}
      </div>
    </div>
    </>
  );
};
export default MoviesList;