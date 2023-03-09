import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    let price = 0;
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedChair, setSelectedChair] = useState<number[]>([]);
    const [seanceDetails, setSeanceDetails] = useState<SeanceType | null>(null)
    const userIdLocalStorage = window.localStorage.getItem("userId");


    const [requestNumber, setRequestNumber] = useState(0);
    
    const handleClick = (chairs: ArmchairType) => {
        setSelected((prevSelected: number[]) => {
            if (prevSelected.includes(chairs.cinemaArmchair.cinemaArmchairId)) {
              return prevSelected.filter((id: number) => id !== chairs.cinemaArmchair.cinemaArmchairId);
            } else {
              return [...prevSelected, chairs.cinemaArmchair.cinemaArmchairId];
            }
          });
          setSelectedChair((prevSelected: number[]) => {
            if (prevSelected.includes(chairs.SeatingNumber)) {
              return prevSelected.filter((id: number) => id !== chairs.SeatingNumber);
            } else {
              return [...prevSelected, chairs.SeatingNumber];
            }
          });
    } 

    const bookSeats = () => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_BASE}booking/reserve`,
            data: {
                userId: Number(userIdLocalStorage),
                seanceId: Number(seanceId),
                seatReserved: selected,
            },
          })
            .then(({ data, status }) => {
              console.log(data);
              if (status === 201) {
                setSeanceDetails(null)
                setRequestNumber((prev)=> prev + 1)
                console.log("Correctly booked!");
              }
            })
            .catch((e: AxiosError) => {
              if (e.response) {
                console.log(e.response.data);
              }
            });

            setRequestNumber((prev) => prev + 1);
            console.log(requestNumber)

    };

    useEffect(()=>{
        axios<SeanceType>({
            method: "get",
                url: `${process.env.REACT_APP_SERVER_BASE}booking/repertoire?id=${seanceId}`,
            })
            .then(({data}) => {setSeanceDetails(data); console.log("Done"); setSelected([]); setSelectedChair([])})
            .catch((err) => console.log(err));
          
    },[requestNumber])

    if(seanceDetails === null) {
        return(
            <div className='contener'>Pobieranie danych D:</div>
        )
    }

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
                            onClick={() => handleClick(chairs)}
                            disabled={isChairReserverd}>
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
                <p>Cena za jeden bilet 19 złotych. Ilość wybranych miejsc: {selected.length}</p>
                <p>Wybrane miejsca: <h4>{selectedChair + " "}</h4>
                Cena: {price = selected.length * 19} złotych</p>
                <>
                    <button className='reserve-button' onClick={bookSeats} disabled = {!selectedChair.length}><h3>Zarezerwuj bilety</h3></button>
                    <ToastContainer />
                </>
            </div>
        </div>
    )
};

export default Booking;