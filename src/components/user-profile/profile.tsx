import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import './style.css';

interface User {
    userId: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

const Profile = () => {

    const { logged, setLogged } = useContext(GlobalContext);
    const [userProfile, setUserProfile] = useState<User[]>([]);
    const accessToken = window.localStorage.getItem("accessToken");
    const usernameLocalStorage = window.localStorage.getItem("username");

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

    return (
        <div className="wrapper-profil">
          <div className='profil-wrapper'>
            {userProfile.map((profile) => (
                <div key={profile.userId}>
                    <div className='info'>
                        <span className='user-info'>Nazwa użytkownika: </span>
                        <span className='personally-user-info'>{profile.username}</span>
                    </div>
                    <div className='info'>
                        <span className='user-info'>Imię: </span>
                        <span className='personally-user-info'>{profile.first_name}</span>
                    </div>
                    <div className='info'>
                        <span className='user-info'>Nazwisko: </span>
                        <span className='personally-user-info'>{profile.last_name}</span>
                    </div>
                    <div className='info'>
                        <span className='user-info'>Email: </span>
                        <span className='personally-user-info'>{profile.email}</span>
                    </div>
                </div>
            ))}
          </div>
        </div>
    );
}

export default Profile;