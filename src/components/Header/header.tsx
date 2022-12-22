import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import './style.css';

interface Profile {
    userId: number;
    username: string;
  }

const Header = () => {
    const { logged, setLogged } = useContext(GlobalContext);
    const [userProfile, setUserProfile] = useState<Profile[]>([]);
    const navigate = useNavigate();
    const accessToken = window.localStorage.getItem("accessToken");
    const usernameLocalStorage = window.localStorage.getItem("username");

    const handleLogOut = () => {
        if(accessToken) {
            window.localStorage.removeItem("accessToken");
            setLogged(false);
            navigate("/");
        }
        console.log("Refresh token after remove: " + accessToken)
    }

        useEffect(() => {
            if(logged) {
                fetch(`${process.env.REACT_APP_SERVER_BASE}api/auth/profile/${usernameLocalStorage}`,
                    {
                        method: 'get',
                        headers: new Headers({
                            'Authorization': `Bearer ${accessToken}`
                        }),
                    })
                    .then((res) => res.json())
                    .then((data) => setUserProfile(data));
            }
          }, [logged]);

    return(
        <div className='header'>
            <Link to={"/"}><div className='logo' data-text="CINEMA">CINEMA</div></Link>
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

