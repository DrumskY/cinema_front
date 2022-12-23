import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

interface CommentAuthorType {
    userId: number;
    username: string;
}

interface MovieCommentType {
    commentId: number;
    authorCommId: number;
    comment: string;
    user: CommentAuthorType
}

interface MovieDetailType {
    movieId: number;
    name: string;
    type: string;
    image: string;
    rating: number;
    description: string;
    comments: MovieCommentType[]
}

const MovieDetails = () => {
    let { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetailType | null>(null);
    console.log(movieDetails)
    useEffect(()=>{
        axios<MovieDetailType>({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_BASE}movies/details?id=${id}`,
          })
          .then(({data}) => setMovieDetails(data))
          .catch((err) => console.log(err));
    },[id])
    
    if(movieDetails === null) {
        return(
            <div className='contener'>Pobieranie danych D:</div>
        )
    }  
    
    return(
        <div className='contener'>
            <p>{movieDetails.name}</p>
        </div>
    )
};

export default MovieDetails;