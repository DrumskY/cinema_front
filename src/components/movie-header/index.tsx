import './style.css';
const testowy = require('./testowy.jpg');

const MovieHeader = () => {
    return(
        <div className='contener'>
            <div className='header2'>
                <img src={testowy} alt='vader' />
                <p className='movie-review-info'>Przegląd filmów:</p>
                <p className='movie-review-title'>Gwiezdne Wojny - wojny klonów</p>
                <p className='movie-review-show-time'>Czas sensu 120 minut</p>
            </div>
        </div>
    )
};

export default MovieHeader;