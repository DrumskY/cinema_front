import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {


    return(
        <div className='header'>
            <Link to={"/"}><div className='logo' data-text="CINEMA">CINEMA</div></Link>
            <Link to={"/login"}><div className='login'>Login</div></Link>
            <Link to={"/register"}><div className='register'>Sign Up</div></Link>
        </div>
        
    )
};

export default Header;

