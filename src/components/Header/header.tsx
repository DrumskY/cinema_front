import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import './style.css';
import { SearchTermTypes } from './types';

const Header = () => {
    let setFocus = (false);
    const input = document.querySelector('.search_input');
    const checkFocus = document.activeElement === input;
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchTermTypes[]>([]);
    const { logged, setLogged, userProfile, setUserProfile} = useContext(GlobalContext);
    const navigate = useNavigate();
    const accessToken = window.localStorage.getItem("accessToken");
    const usernameLocalStorage = window.localStorage.getItem("username");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_BASE}movies/search?searchParam=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => setResults(data));
    };

    if(checkFocus){
        setFocus = true;
    }
    else {
        setFocus = false;
    }
    
    const handleLogOut = () => {
        if(accessToken) {
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("username");
            setLogged(false);
            navigate("/");
        }
        console.log("Refresh token after remove: " + accessToken)
    };

    console.log("czemu nie działa", logged)

    useEffect(() => {
        if(accessToken && usernameLocalStorage) {
            console.log("useEffect");
            fetch(`${process.env.REACT_APP_SERVER_BASE}api/auth/profile/${usernameLocalStorage}`,
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': `Bearer ${accessToken}`
                    }),
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                        throw new Error('Invalid token');
                })
                .then((data) => {
                    setUserProfile(data)
                    console.log("essa", data)
                    setLogged(true)
                })
                .catch(err => console.log(err))
        }
    }, [logged]);

    return(
        <div className='header'>
            <Link to={"/"}><div className='logo' data-text="CINEMA">CINEMA</div></Link>
            <div className="search_container">
                <form onSubmit={handleSubmit} className="form_container">
                    <input
                        className="search_input" 
                        type="text" 
                        placeholder="Search movie"
                        value={searchTerm}
                        onChange={handleChange} />
                        <>
                            {checkFocus ? (
                                <ul className='search_ul'>
                                {results.map(result => (
                                    <Link className='movie_link' to={`/movies/${result.movieId}`} key={result.movieId}>
                                        <div className='n'>
                                            <li className='search_li'>{result.name}</li>
                                        </div>
                                    </Link>
                                ))}
                                </ul>
                            ) : (
                                console.log("Input is not focused")
                            )}
                       </>
                </form>
            </div>
            {logged ? (
                <>
                    {userProfile.map((profile) => (
                        <div key={profile.userId}>
                            <Link to={"/profil"}>
                                <div className='login'>
                                    {profile.username}
                                </div>
                            </Link>
                            <Link to={"/"}>
                                <div className='register' onClick={handleLogOut}>
                                    Sign Out
                                </div>
                            </Link>
                         </div>
                     ))} 
                </>
            ) : (
                <>
                    <Link to={"/login"}><div className='login'>Login</div></Link>
                    <Link to={"/register"}><div className='register'>Sign Up</div></Link>
                </>
            )}
        </div>
    )
};

export default Header;

