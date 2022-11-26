import './App.css';
import Header from './components/header/header';
import MovieHeader from './components/movie-header';
import MoviesList from './components/movies-list';
import MoviesListByRating from './components/movies-list/searchByRating';

function App() {

  return (
    <div className='body'>
    <Header />
    <MovieHeader />
    <MoviesList  />
    <MoviesListByRating />
    </div>
  );
}

export default App;
