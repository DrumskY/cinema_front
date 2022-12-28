import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./style.css";

interface MovieType {
    movieId: number;
    name: string;
    type: string;
    movietime: string;
    image: string;
    rating: number;
    description: string;
    movieSeance: MovieSeanceType[];
}

interface MovieSeanceType {
    seanceId: number;
    cinemaHallFk: number;
    seanceTime: string;
}

const daysOfWeekFullName = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

const getFullDate = (day: number, hasName: boolean = false) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + day);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const currentDay = currentDate.getDay();
    const dayString = daysOfWeekFullName[(currentDay)];

    return (`${hasName ? dayString : '' } ${date}/${month}/${year}`).trim()
}

const Repertoire = () => {
    const { logged } = useContext(GlobalContext);
    const [displayedMovies, setDisplayedMovies] = useState<MovieType[]>([]);
    const daysOfWeek = ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'So'];
    const currentDay = new Date().getDay();
    const [selectedDay, setSelectedDay] = useState(0);
  
    useEffect(()=>{
        const repertoireAtTheDay = getFullDate(selectedDay)
        console.log(repertoireAtTheDay)
        fetch(`http://localhost:5000/seance/repertoire?searchParam=${repertoireAtTheDay}`)
            .then((res) => res.json())
            .then((data) => setDisplayedMovies(data));
    },[selectedDay])
    
    const handleClick = (day: number) => {
        setSelectedDay(day);
    }

    const filterMovies = (displayedMovies.filter((movie => movie.movieSeance.length>0)))
    console.log(filterMovies)

    return (
        <>
            <div className="repertoire-container">
                <div>
                    <h3 className="repertoire-title">Repertuar Cinema:</h3>
                </div>
                <div className="week">
                    <div className="day_0" onClick={() => handleClick(0)}><p>Dziś</p></div>
                    <div className="day_1" onClick={() => handleClick(1)}><p>{daysOfWeek[(currentDay + 1) % 7]}</p></div>
                    <div className="day_2" onClick={() => handleClick(2)}><p>{daysOfWeek[(currentDay + 2) % 7]}</p></div>
                    <div className="day_3" onClick={() => handleClick(3)}><p>{daysOfWeek[(currentDay + 3) % 7]}</p></div>
                    <div className="day_4" onClick={() => handleClick(4)}><p>{daysOfWeek[(currentDay + 4) % 7]}</p></div>
                    <div className="day_5" onClick={() => handleClick(5)}><p>{daysOfWeek[(currentDay + 5) % 7]}</p></div>
                    <div className="day_6" onClick={() => handleClick(6)}><p>{daysOfWeek[(currentDay + 6) % 7]}</p></div>
                </div>
                <div className="today">
                    {selectedDay === 0 && <p>{getFullDate(0, true)}</p>}
                    {selectedDay === 1 && <p>{getFullDate(1, true)}</p>}
                    {selectedDay === 2 && <p>{getFullDate(2, true)}</p>}
                    {selectedDay === 3 && <p>{getFullDate(3, true)}</p>}
                    {selectedDay === 4 && <p>{getFullDate(4, true)}</p>}
                    {selectedDay === 5 && <p>{getFullDate(5, true)}</p>}
                    {selectedDay === 6 && <p>{getFullDate(6, true)}</p>}
                </div>
            </div>

            <div className="repertoire-films">
                {filterMovies.map((movies) => (
                    <div key={movies.movieId} className="repertoire-simple-film">
                        
                        <img src={`${process.env.REACT_APP_SERVER_BASE}${movies.image}`} alt={movies.name} />
                        
                        <div className="movie-repertoire-info">
                            <h2>{movies.name}</h2>
                            <p><strong>Gatunek:</strong> {movies.type} | <strong>Czas seansu:</strong> {movies.movietime} minut</p>
                            <div className="seance-time-container">
                                {movies.movieSeance.map((seance) => ( 
                                    <div className="seance-time" key={seance.seanceId}>
                                        <Link to={logged ? `/booking/${seance.seanceId}` : `/login`}>
                                            <div className="seance-time-link">
                                                <p>{seance.seanceTime}</p>
                                                <p>Sala: {seance.cinemaHallFk}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}



export default Repertoire;

