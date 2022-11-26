//import React, { useEffect, useState } from 'react';
//import { render } from '@testing-library/react';
import './style.css';
//import testowy from './testowy.jpg';
const testowy = require('./testowy.jpg');

// interface MovieType {
//     movieId: number;
//     name: string;
//     type: string;
//     image: string;
//     rating: number;
//     description: string;
//   }

const MovieHeader = () => {
    // const [displayedMovies, setDisplayedMovies] = useState<MovieType[]>([]);
    // useEffect(() => {
    //     fetch("http://localhost:5000/movies/random")
    //     .then((res) => res.json())
    //     .then((data) => setDisplayedMovies(data));
    // }, []);
    // return(
    //     <div className='contener'>
    //         {displayedMovies.map((movie) => (
    //             <div className='header2' key={movie.movieId}>
    //                 <p>{movie.name}</p>
    //                 <img src={`${process.env.REACT_APP_SERVER_BASE}${movie.image}`} alt={movie.name}></img>
    //             </div>
    //         ))}
    //     </div>
    // )
    return(
        <div className='contener'>
            <div className='header2'>
                <img src={testowy} alt='vader' />
                <p className='movie-review-info'>Przegląd filmów:</p>
                <p className='movie-review-title'>Gwiezdne Wojny - wojny klonów</p>
                <p className='movie-review-show-time'>Czas sensu 120 minut</p>
            </div>
        </div>
    )
};

export default MovieHeader;