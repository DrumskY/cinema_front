import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
 
const Register = () => {
   const [username, setUsername] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

  
   const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios({
         method: 'POST',
         url: `${process.env.REACT_APP_SERVER_BASE}api/auth/register`,
         data: {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
         },
      })
         .then(({data}) => {
            if (data.ok) {
               console.log("Register success");
               navigate('/login');
            }
            else {
               console.log(data);
               navigate('/login');
            }
         })
         .catch((e: AxiosError) => {
            if (e.response && e.response.data) {
               console.log(e.response.data);
             }
             console.log("Sadge");
         });
   };

     return (
       <div className="wrapper">
         <div className='form-wrapper'>
            <h2>Sign Up</h2>
            <form onSubmit={registerHandler} >
               <div className='username'>
                  <label htmlFor="username">Username</label>
                  <input 
                     type='text' 
                     value={username} 
                     name='username' 
                     placeholder='Username'
                     onChange={(e) => setUsername(e.currentTarget.value)} />
               </div>
               <div className='first-name'>
                  <label htmlFor="first-name">First Name</label>
                  <input 
                     type='text' 
                     value={firstName} 
                     name='first-name' 
                     placeholder='First Name'
                     onChange={(e) => setFirstName(e.currentTarget.value)} />
               </div>
               <div className='last-name'>
                  <label htmlFor="last-name">Last Name</label>
                  <input 
                     type='text' 
                     value={lastName} 
                     name='last-name' 
                     placeholder='Last Name'
                     onChange={(e) => setLastName(e.currentTarget.value)} />
               </div>
               <div className='email'>
                  <label htmlFor="email">Email</label>
                  <input 
                     type='email' 
                     value={email}
                     name='email' 
                     placeholder='Email'
                     onChange={(e) => setEmail(e.currentTarget.value)} />
               </div>
               <div className='password'>
                  <label htmlFor="password">Password</label>
                  <input 
                     type='password' 
                     value={password}
                     name='password'
                     placeholder='Password'
                     onChange={(e) => setPassword(e.currentTarget.value)} />
               </div>              
               <div className='submit'>
                  <button type='submit'>Register Me</button>
               </div>
          </form>
      </div>
   </div>
  );
 }


export default Register;