import { useEffect, useState } from "react";
import "./style.css";

interface MovieType {
  movieId: number;
  name: string;
  type: string;
  image: string;
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
    <div className="favorites-films">
      <div className="aside-button" onClick={goToPrevious}><img src={require("../../assets/left.png")} alt="LEFT"></img></div>
      <div className="films">
      {displayedMovies.map((movie) => (
        <div key={movie.movieId}>
          <img src={`${process.env.REACT_APP_SERVER_BASE}${movie.image}`} alt={movie.name}></img>
        </div>
      ))}
      </div>
      <div className="aside-button" onClick={goToNext}><img src={require("../../assets/right.png")} alt="RIGHT"></img></div>
    </div>
  );
};
export default MoviesList;