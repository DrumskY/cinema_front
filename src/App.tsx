import './App.css';
import Header from './components/header/header';
import { Routes, Route } from "react-router-dom";
import Register from './components/sign-up-sign-in/register';
import GlobalContext from "./context/GlobalContext";
import Login from './components/sign-up-sign-in/login';
import Home from './pages/Home/home';
import { useState } from 'react';
import Profile from './components/user-profile/profile';

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [logged, setLogged] = useState(false);

  return (
    <GlobalContext.Provider value={{ logged, setLogged }}>
      <Header /> 
      <Routes>
        <Route path='/'element= { <Home /> } /> 
        <Route path='/register'element= { <Register />} /> 
        <Route path='/login'element= { <Login />} />  
        <Route path='/profil' element= {<Profile />} />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
