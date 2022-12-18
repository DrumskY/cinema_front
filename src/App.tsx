import './App.css';
import Header from './components/header/header';
import { Routes, Route } from "react-router-dom";
import Register from './components/sign-up-sign-in/register';
import Login from './components/sign-up-sign-in/login';
import Home from './pages/Home/home';
import { useState } from 'react';

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [logged, setLogged] = useState(false);

  return (
    <>
      <Header /> 
      <Routes>
        <Route path='/'element= { <Home /> } /> 
        <Route path='/register'element= { <Register />} /> 
        <Route path='/login'element= { <Login />} />  
      </Routes>
    </>
  );
}

export default App;
