import axios, { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useParams } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import './style.css';
import "react-confirm-alert/src/react-confirm-alert.css";
import { MovieDetailType } from './types';

const MovieDetails = () => {
    let { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetailType | null>(null);
    const userIdLocalStorage = window.localStorage.getItem("userId");
    const usernameLocalStorage = window.localStorage.getItem("username");
    const roleLocalStorage = window.localStorage.getItem("role");
    const accessToken = window.localStorage.getItem("accessToken");
    const commentId = window.localStorage.getItem("commentId");

    const [isStart, setIsStart] = useState(false)
    const { logged } = useContext(GlobalContext);
    const [comment, setComment] = useState('');

    const [requestNumber, setRequestNumber] = useState(0);

    console.log(movieDetails)
    useEffect(()=>{
        axios<MovieDetailType>({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_BASE}movies/details?id=${id}`,
          })
          .then(({data}) => setMovieDetails(data))
          .catch((err) => console.log(err));
    },[requestNumber])

    useEffect(()=>{
        if(isStart) {
            console.log("Id comentarza przed usunieciem to: "+commentId);
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_BASE}comment/delete`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: {
                    commentId: commentId, 
                },
            })
                .then(({data, status}) => {
                    if (status === 202) {
                        console.log("Comment success deleted");
                        setRequestNumber((prev) => prev + 1)
                    }   
                })
                .catch((e: AxiosError) => {
                    if (e.response && e.response.data) {
                        console.log(e.response.data);
                    }
                });
                setIsStart(false)
    };
    },[isStart, commentId])

    const commentHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_BASE}comment/add`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                comment: comment,
                authorId: userIdLocalStorage,
                authorCommId: id,
            },
        })
            .then(({data, status}) => {
                if (status === 201) {
                    console.log("Comment success added");
                    setRequestNumber((prev) => prev + 1)
                }
            })
            .catch((e: AxiosError) => {
                if (e.response && e.response.data) {
                    console.log(e.response.data);
                }
            });
    };
    
    const handleClick = () => {
        console.log("Id comentarza to: "+id);
            const option = {
                title: 'Usunięcie komentarza.',
                message: 'Czy potwierdzasz usunięcie swojego komentarza?',
                buttons: [
                  {
                    label: 'Tak',
                    onClick: () => {setIsStart(true)}
                  },
                  {
                    label: 'Nie',
                    onClick: () => console.log('Click No')
                  }, 
                ]
            }
            confirmAlert(option)
    }

    if(movieDetails === null) {
        return(
            <div className='contener'>Pobieranie danych D:</div>
        )
    }  
    
    return(
        <>
            <div className='movie-details-contener'>
                <div className='imagedesc' style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_BASE}/image/${movieDetails.imagedesc})`}}>
                <div className='movie-details-flex-contener'>
                    <div className='image-movie-details'>
                        <img src={`${process.env.REACT_APP_SERVER_BASE}${movieDetails.image}`} alt={movieDetails.name} />
                    </div>
                    <div className='movie-details-desc'>
                        <div className='description'>
                            <h1>{movieDetails.name}</h1>
                            <p>{movieDetails.description}</p>
                        </div>
                        <div className='film-info'>
                            <div>
                                <h3>Gatunek:</h3>
                                <p>{movieDetails.type}</p>
                            </div>
                            <div>
                                <h3>Ocena:</h3>
                                <p>{movieDetails.rating}</p>
                            </div>
                            <div>
                                <h3>Czas seansu:</h3>
                                <p>{movieDetails.movietime} minut</p>
                            </div>
                            <div>
                                <h3>Reżyseria:</h3>
                                <p>{movieDetails.direction}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className='comment-container'>
                {movieDetails && movieDetails.movieComment.map(comment => (
                    <div className='user-comment' key={comment.commentId}>
                        <div className='username-and-edit'>
                            <div><h3>{comment.author.username}</h3></div>
                            <>
                                {logged && comment.author.username === usernameLocalStorage || roleLocalStorage === "ADMIN"? (
                                    <div className='delete-comment'>
                                        <img 
                                            src={require("../../assets/cancel.png")} 
                                            alt="X" 
                                            onClick={()=>{
                                                window.localStorage.setItem("commentId", String(comment.commentId));
                                                handleClick()
                                            }}/>
                                    </div>
                                    ) : (
                                        console.log("Musisz być zalogowany aby usunąć komentarz")
                                )}
                            </>
                        </div>
                        <div>{comment.comment}</div>
                    </div>
                ))}

                <>
                    {logged ? (
                        <div className='add-comment'>
                            <form onSubmit={commentHandler}>
                                <textarea 
                                    placeholder='Podobał się film? Zostaw komentarz :D'
                                    required
                                    name="comment"
                                    value={comment}
                                    minLength={10}
                                    onChange={(e) => setComment(e.currentTarget.value)}></textarea>
                                <div className='button'>
                                    <button 
                                        className='button-submit-comment' 
                                        type='submit' 
                                        // onClick={() => {window.location.reload()}}>Wyślij</button>
                                        >Wyślij</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className='add-comment'>
                            <h4><Link className='movie-details-link' to={'/login'}>Zaloguj się aby dodać komentarz.</Link></h4>
                        </div>
                    )}
                </>
            </div>
        </>
    )
};

export default MovieDetails;