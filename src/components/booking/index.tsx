import { useParams } from 'react-router-dom';
import './style.css';

const Booking = () => {
    let { seanceId } = useParams();

    return (
        <div className="contener"><h1>id seansu: {seanceId}</h1></div>
    )
};

export default Booking;