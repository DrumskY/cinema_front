import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import './style.css';
import { SearchTermTypes } from './types';

const Administration = () => {
    const [activeDiv, setActiveDiv] = useState("");
    const accessToken = window.localStorage.getItem("accessToken");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [movietime, setMovietime] = useState("");
    const [direction, setDirection] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagedesc, setImagedesc] = useState<File | null>(null);

    const [movieName, setMovieName] = useState("");
    const [cinemaHallId, setCinemaHallId] = useState("");
    const [movieSeanceData, setMovieSeanceData] = useState("");
    const [movieSeanceTime, setMovieSeanceTime] = useState("");
    const [results, setResults] = useState<SearchTermTypes[]>([]);
    const [movieId, setMovieId] = useState(Number);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files?.[0] ? e.target.files[0] : null);
    };

    const handleImageDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImagedesc(e.target.files ? e.target.files[0] : null);
    };

    const addFilmHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        const formDataDesc = new FormData();
        image ? formData.append('image', image) : null
        imagedesc ? formDataDesc.append('image', imagedesc) : null
        console.log(image?.name)
        console.log(imagedesc?.name)
        try {
          await axios.post(`${process.env.REACT_APP_SERVER_BASE}admin/addimage`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Image uploaded successfully');
        } catch (err) {
          console.error(err);
        }

        try {
            await axios.post(`${process.env.REACT_APP_SERVER_BASE}admin/addimagedesc`, formDataDesc, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Image-Desc uploaded successfully');
          } catch (err) {
            console.error(err);
          }
  
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_BASE}admin/addmovie`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                name,
                type,
                movietime,
                direction,
                image: image?.name,
                imagedesc: imagedesc?.name,
                rating,
                description,
            },
        })
            .then(({data}) => {
                if (data.ok) {
                    console.log("Film success added");
                }
                else {
                    console.log(data);
                    window.location.reload()
                }
            })
            .catch((e: AxiosError) => {
                if (e.response && e.response.data) {
                    console.log(e.response.data);
                }
                    console.log("Sadge");
            });
    };

    const handleClick = (divName: string) => {
        setActiveDiv(divName);
    };

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_SERVER_BASE}movies/search?searchParam=${movieName}`)
            .then((res) => res.json())
            .then((data) => setResults(data));
    },[movieName])

    const handleMovieId = (movieId:number) => {
      setMovieId(movieId)
    }
    console.log("Id wybranego filmu to: " + movieId)
    console.log(movieSeanceData)
    console.log(movieSeanceTime)
    console.log(cinemaHallId)

    const addSeanceHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_BASE}admin/set-screening`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        data: {
            movieId: movieId,
            cinemaHallid: cinemaHallId,
            seanceData: movieSeanceData,
            seanceTime: movieSeanceTime
        },
    })
        .then(({data}) => {
            if (data.ok) {
                console.log("Seance success added");
            }
            else {
                console.log(data);
                window.location.reload()
            }
        })
        .catch((e: AxiosError) => {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
                console.log("Sadge");
        });
    };

    return (
        <div className="main-admin">
            <div className="contener-admin">
                <div className="menu-admin"><h2 onClick={() => handleClick("film")}>Dodaj film</h2></div>
                <div className="menu-admin"><h2 onClick={() => handleClick("repertuar")}>Dodaj repertuar</h2></div>
            </div>
            <div className='content-admin'>
            {activeDiv === "film" && (
                <div>
                    <div className='form-wrapper-admin'>
             <h2>Dodaj film</h2>
             <form onSubmit={addFilmHandler}>
                <div className='name'>
                   <label htmlFor="name">Nazwa</label>
                   <input 
                     type='text'
                     value={name}
                     name='name'
                     required
                     placeholder='Nazwa filmu'
                     onChange={(e) => setName(e.currentTarget.value)}
                      />
                </div>
                <div className='type'>
                   <label htmlFor="type">Gatunek</label>
                   <input 
                     type='text' 
                     value={type}
                     required
                     name='type'
                     placeholder='Gatunek'
                     onChange={(e) => setType(e.currentTarget.value)}
                     />
                </div>
                <div className='movietime'>
                   <label htmlFor="movietime">Czas trwania seansu</label>
                   <input 
                     type='text' 
                     value={movietime}
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='movietime'
                     placeholder='Czas trwania seansu (min)'
                     onChange={(e) => setMovietime(e.currentTarget.value)}
                     />
                </div> 
                <div className='direction'>
                   <label htmlFor="direction">Reżyseria</label>
                   <input 
                     type='text' 
                     value={direction}
                     required
                     name='direction'
                     placeholder='Reżyseria'
                     onChange={(e) => setDirection(e.currentTarget.value)}
                     />
                </div>            
                <div className='image'>
                   <label htmlFor="image" className='drop-title'>Zdjęcie</label>
                   <input 
                     type='file' 
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='image'
                     placeholder='Ikona'
                     onChange={handleImageChange}
                     />
                </div>       
                <div className='imgdesc'>
                   <label htmlFor="imgdesc" className='drop-title'>Zdjęcie opisowe</label>
                   <input 
                     type='file' 
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='imgdesc'
                     placeholder='Zdjęcie'
                     onChange={handleImageDescChange}
                     />
                </div>  
                <div className='rating'>
                   <label htmlFor="rating">Ocena filmu</label>
                   <input 
                     type='text' 
                     value={rating}
                     required
                     name='rate'
                     placeholder='Ocena'
                     onChange={(e) => setRating(e.currentTarget.value)}
                     />
                </div> 
                <div className='desc'>
                   <label htmlFor="desc">Opis</label>
                      <textarea 
                            value={description}
                            placeholder='Opis'
                            required
                            name="Opis"
                            minLength={10}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            ></textarea>
                </div>   
                <div className='submit'>
                   <button className='save-movie-btn' type='submit'>Zapisz</button>
                </div>
           </form>
       </div>
                </div>
            )}
            {activeDiv === "repertuar" && (
                <div>
                       <div className='form-wrapper-admin'>
             <h2>Dodaj Repertuar</h2>
             <form onSubmit={addSeanceHandler}>
                <div className='name'>
                   <label htmlFor="name">Nazwa Filmu</label>
                   <input 
                     className="search_input_seance" 
                     type='text'
                     value={movieName}
                     name='name'
                     placeholder='Nazwa filmu'
                     onChange={(e) => setMovieName(e.currentTarget.value)}
                      />
                       <>
                          <ul className='search_ul_seance'>
                            {results.map(result => (
                              <div className='movie_search' key={result.movieId}>
                                  <li className='search_li_seance' onClick={() => handleMovieId(result.movieId)}>{result.name}</li>
                              </div>
                            ))}
                          </ul>
                       </>
                </div>
                <div className='type'>
                   <label htmlFor="type">Numer sali (od 1 do 3)</label>
                   <input 
                     type='text' 
                     value={cinemaHallId}
                     required
                     name='type'
                     placeholder='Wpisz numer sali'
                     onChange={(e) => setCinemaHallId(e.currentTarget.value)}
                     />
                </div>
                <div className='movieseancedata'>
                   <label htmlFor="movieseancedata">Data seansu (użyj wyrażenia DD/MM/YYY)</label>
                   <input 
                     type='text' 
                     value={movieSeanceData}
                     required
                     name='movieseancedata'
                     placeholder='Wpisz datę rozpoczęcia seansu'
                     onChange={(e) => setMovieSeanceData(e.currentTarget.value)}
                     />
                </div> 
                <div className='movieseancetime'>
                   <label htmlFor="movieseancetime">Godzina rozpoczęcia seansu (użyj wyrażenia HH:MM)</label>
                   <input 
                     type='text' 
                     value={movieSeanceTime}
                     required
                     name='movieseancetime'
                     placeholder='Wpisz godzinę rozpoczęcia sensu'
                     onChange={(e) => setMovieSeanceTime(e.currentTarget.value)}
                     />
                </div>            
                <div className='submit'>
                   <button className='save-movie-btn' type='submit'>Zapisz</button>
                </div>
           </form>
           </div>
                </div>
            )}
            </div>
        </div>
    )
};

export default Administration;