import axios, { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import './style.css';

const Login = () => {
   const { setLogged } = useContext(GlobalContext);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios({
         method: "POST",
         url: `${process.env.REACT_APP_SERVER_BASE}api/auth/login`,
         data: {
           email,
           password,
         },
       })
         .then(({ data, status }) => {
           console.log(data.user);
           if (status === 200) {
             window.localStorage.setItem("accessToken", data.token);
             window.localStorage.setItem("userId", data.user.id);
             window.localStorage.setItem("username", data.user.name);
             window.localStorage.setItem("role", data.user.role);
             console.log("Log in success");
             setLogged(true);
             navigate("/");
           }
         })
         .catch((e: AxiosError) => {
           if (e.response) {
             console.log(e.response.data);
           }
         });
   };

    return (
        <div className="wrapper-login">
          <div className='form-wrapper'>
             <h2>Sign In</h2>
             <form  onSubmit={loginHandler}>
                <div className='email'>
                   <label htmlFor="email">Email</label>
                   <input 
                     type='email'
                     value={email} 
                     name='email'
                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                     required
                     placeholder='Email'
                     onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>
                <div className='password'>
                   <label htmlFor="password">Password</label>
                   <input 
                     type='password' 
                     value={password}
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='password'
                     placeholder='Password'
                     onChange={(e) => setPassword(e.currentTarget.value)} />
                </div>              
                <div className='submit'>
                   <button className='sign-in-up' type='submit'>Sign In</button>
                </div>
           </form>
       </div>
    </div>
    );
}
export default Login;