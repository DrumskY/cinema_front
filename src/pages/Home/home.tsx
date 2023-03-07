import './style.css';
import MovieHeader from '../../components/movie-baner';
import MoviesList from '../../components/movies-list';
import MoviesListByRating from '../../components/movies-list/searchByRating';
import SearchAsc from '../../components/movies-list/searchAsc';

function Home() {
    return(
    <div>
        <MovieHeader />
        <MoviesList />
        <MoviesListByRating />
        <SearchAsc />
    </div>
    );
}

export default Home;