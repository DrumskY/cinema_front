import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import moment from "moment-timezone";
import './style.css';

interface User {
    userId: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface ReservationType {
    reservationData: string;
    seatReservation: SeatReservationType[];
}

interface SeatReservationType {
    SeatingNumber: number;
    seance: {
        seanceData: string;
        seanceTime: string;
        movieShow: {
            name: string;
        };
    };
}

const Profile = () => {

    const { logged, setLogged } = useContext(GlobalContext);
    const [userProfile, setUserProfile] = useState<User[]>([]);
    const [bookingReservation, setBookingReservation] = useState<ReservationType[]>([]);
    const accessToken = window.localStorage.getItem("accessToken");
    const usernameLocalStorage = window.localStorage.getItem("username");
    const userIdLocalStorage = window.localStorage.getItem("userId");

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

        useEffect(() => {
            fetch(`${process.env.REACT_APP_SERVER_BASE}booking/reservation?id=${userIdLocalStorage}`,
            {
                method: 'get',
            })
            .then((res) => res.json())
            .then((data) => setBookingReservation(data));
        }, [])

        console.log(bookingReservation)

    return (
        <div className="wrapper-profil">
          <div className='profil-wrapper'>
            {userProfile.map((profile) => (
                <div className='profil-info' key={profile.userId}>
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
            <div className='reservation-info'>
                <h3>Rezerwacje:</h3>
                <>
                {bookingReservation.map((booked) => {
                    const now = moment.utc(booked.reservationData,"YYYY-MM-DD\THH:mm:ss\Z").format(`DD/MM/YYYY - HH:mm`);
                    console.log(now);
                    return <>
                        <div className='reservation-data'><h3>Data rezerwacji: {now}</h3></div>
                        <div className='film-info-reservation'>
                            <>
                                {booked.seatReservation.map((reserved)=> (
                                    <div className='reserved'>
                                        <div className='reserved-column'>
                                            <div>{reserved.seance.movieShow.name}</div>
                                            <div>{reserved.seance.seanceData+" "+reserved.seance.seanceTime}</div>
                                            <p>Wybrane miejsca:</p>
                                            <div>{reserved.SeatingNumber}</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        </div>
                    </>
                })}
                </>
            </div>
          </div>
          
        </div>
    );
}

export default Profile;