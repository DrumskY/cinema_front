import './App.css';
import Header from './components/header/header';
import { Routes, Route } from "react-router-dom";
import Register from './components/sign-up-sign-in/register';
import GlobalContext from "./context/GlobalContext";
import Login from './components/sign-up-sign-in/login';
import Home from './pages/Home/home';
import { useState } from 'react';
import Profile from './components/user-profile/profile';
import MovieDetails from './components/movie-details';
import { ProfileType } from './types/user';
import Repertoire from './components/repertoire/index';
import Booking from './components/booking';
import Badrequest from './components/404';

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [logged, setLogged] = useState(false);
  const [userProfile, setUserProfile] = useState<ProfileType[]>([]);

  return (
    <GlobalContext.Provider value={{ logged, setLogged, userProfile, setUserProfile }}>
      <Header /> 
      <Routes>
        <Route path='/'element= { <Home /> } /> 
        <Route path='/register'element= { <Register />} /> 
        <Route path='/login'element= { <Login />} />  
        <Route path='/profil' element= {<Profile />} />
        <Route path='/repertoire' element={<Repertoire />} />
        <Route path='/booking/:seanceId' element={<Booking />} />
        <Route path='/movies/:id' element = {<MovieDetails />} />
        <Route path='*' element = {<Badrequest />} />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
