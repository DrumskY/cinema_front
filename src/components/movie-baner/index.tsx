import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import { MovieType } from './types';

const MovieHeader = () => {
    
    const [randNum, setRandNum] = useState(1);
    const [displayedMovies, setDisplayedMovies] = useState<MovieType | null>(null);

        useEffect(()=>{
            axios<MovieType>({
                method: "get",
                url: `${process.env.REACT_APP_SERVER_BASE}movies/details?id=${randNum}`,
            })
            .then(({data}) => setDisplayedMovies(data))
            .catch((err) => console.log(err));
        },[])

        useEffect(()=>{
            const interval = setInterval(() => {
            axios<MovieType>({
                method: "get",
                url: `${process.env.REACT_APP_SERVER_BASE}movies/details?id=${randNum}`,
            })
            .then(({data}) => setDisplayedMovies(data))
            .catch((err) => console.log(err));
            setRandNum(randNum+1)
            if(randNum === 15) setRandNum(1)
            },15000);
            return () => clearInterval(interval);
         },[randNum])

         if(displayedMovies === null) {
            return(
                <div className='contener'>Pobieranie danych D:</div>
            )
        }  
    
    return(
        <div className='contener'>
            <div className='img-contener' style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_BASE}image/${displayedMovies.imagedesc})`}}>
                    <div className='title-baner'>
                        <p>Przegląd filmów:</p>
                        <h1>{displayedMovies.name}</h1>
                    </div>
                    <div className='more-info-baner'>
                        <div>
                            <h3>Gatunek:</h3>
                            <p>{displayedMovies.type}</p>
                        </div>
                        <div>
                            <h3>Ocena:</h3>
                            <p>{displayedMovies.rating}</p>
                        </div>
                        <div>
                            <h3>Czas seansu:</h3>
                            <p>{displayedMovies.movietime} minut</p>
                        </div>
                        <div>
                            <h3>Reżyseria:</h3>
                            <p>{displayedMovies.direction}</p>
                        </div>
                    </div>
            </div>
        </div>
    )
};

export default MovieHeader;