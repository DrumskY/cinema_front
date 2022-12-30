import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

interface SeanceType {
    seanceId: number;
    seanceData: string;
    seanceTime: string;
    movieShowFk: number;
    cinemaHallFk: number;
    movieShow: MovieType;
    seatAtTheSeance: ArmchairType[];
};

interface ArmchairType {
    cinemaArmchair: {
        cinemaArmchairId: number;
        row: string;
        x: string;
        y: string;
        chairinhallid: number;
    };
    SeatingNumber: number;
    reservationNum: number | null;
};

interface MovieType {
    name: string;
    type: string;
    movietime: string;
    direction: string;
};

const Booking = () => {
    let { seanceId } = useParams();
    let seatNumber = 1
    const [selected, setSelected] = useState<number[]>([]);
    const [seanceDetails, setSeanceDetails] = useState<SeanceType | null>(null)

    const handleClick = (chairs: ArmchairType) => {
        setSelected((prevSelected: number[]) => {
            if (prevSelected.includes(chairs.cinemaArmchair.cinemaArmchairId)) {
              return prevSelected.filter((id: number) => id !== chairs.cinemaArmchair.cinemaArmchairId);
            } else {
              return [...prevSelected, chairs.cinemaArmchair.cinemaArmchairId];
            }
          });
        console.log(chairs.cinemaArmchair.cinemaArmchairId);
    }
    

    useEffect(()=>{
        axios<SeanceType>({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_BASE}booking/repertoire?id=${seanceId}`,
          })
          .then(({data}) => setSeanceDetails(data))
          .catch((err) => console.log(err));
    },[seanceId])

    if(seanceDetails === null) {
        return(
            <div className='contener'>Pobieranie danych D:</div>
        )
    }

    const bookSeats = () => {

    };

    console.log(seanceDetails)

    console.log("Wybrane miejsca: "+selected);
    return (
        <div className="contener-for-booking">

            <div className='seat-container'>
                <div className='seat-container-title'>
                    <h3>{seanceDetails.movieShow.name}</h3>
                </div>
                <div className='seat-container-title'>
                    <p>{"Numer sali na której odbędzie się seans: "+seanceDetails.cinemaHallFk}</p>
                </div>
                <div className='seat-container-all-info'>
                    <p>{"Data seansu: "+seanceDetails.seanceData}</p>
                    <p>{"Początek seansu: "+seanceDetails.seanceTime}</p>
                </div>
                <div className='seat-container-all-info'>
                    <p>{"Czas seansu: "+seanceDetails.movieShow.movietime} minut</p>
                    <p>{"Gatunek: "+seanceDetails.movieShow.type}</p>
                </div>
            </div>

            <div className='screen-container'>
                <div className="screen"></div>
            </div>

            <div className='armchairs-container'>
                {seanceDetails.seatAtTheSeance.map((chairs, index) => {
                    const isChairSelected = selected.includes(chairs.cinemaArmchair.cinemaArmchairId)
                    const isChairReserverd = Boolean(chairs.reservationNum)
                        return <>
                            <button className={clsx("simple-chair", isChairSelected && "selected-chair", isChairReserverd && "reserved-chair")}
                            onClick={() => handleClick(chairs)} key={chairs.cinemaArmchair.cinemaArmchairId}
                            disabled={isChairReserverd}>
                                {/* <p>{seatNumber++}</p> */}
                                <p>{chairs.SeatingNumber}</p>
                            </button>
                            {index % 2 === 0 && (
                                <div className='hidden'></div>
                            )}
                        </>
                })}
            </div>
            <div className='information'>
                <button className='information-button-simple' disabled><p>Wolne miejsca</p></button>
                <button className='information-button-selected' disabled><p>Wybrane miejsca</p></button>
                <button className='information-button-reserved' disabled><p>Zarezerwowane</p></button>
            </div>

            <div className='reserve'>
                <p>Ilość wybranych miejsc: {selected.length}</p>
                <button className='reserve-button'><h3>Zarezerwuj bilety</h3></button>
            </div>
        </div>
    )
};

export default Booking;