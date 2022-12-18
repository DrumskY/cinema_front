import './style.css';
import Header from '../../components/header/header';
import MovieHeader from '../../components/movie-header';
import MoviesList from '../../components/movies-list';
import MoviesListByRating from '../../components/movies-list/searchByRating';

function Home() {
    return(
    <div>
        <MovieHeader />
        <MoviesList />
        <MoviesListByRating />
    </div>
    );
}

export default Home;