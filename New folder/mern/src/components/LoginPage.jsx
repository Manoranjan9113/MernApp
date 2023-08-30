import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
 import { toast } from 'react-toastify';
import config from '../config.json';

// import { useUserAuth } from '../context/userAuthContext'

const LoginPage = () => {
  const [username, setUsername] = useState('') // Use lowercase 'username'
  const [password, setPassword] = useState('') // Use lowercase 'password'
  const [ak, setAk] = useState("");

  const navigate = useNavigate();
  const sendLoginCr = async () => {
    const userdetails = {
      username: username,
      password: password
    }
        // try {
    //   await logIn(email, password);
    //   navigate("/TodoApp");
    // } catch (err) {
    //   setError(err.message);
    // }
  
    Axios.post('${config.backendUrl}/checkUser', userdetails)
      .then(response => {
        console.log(response.data);
        toast.success("WELCOME TO OUR EMPIRE");
        setTimeout(() => {
          navigate('/TodoApp');
        }, 100);
        const authKey = response.data.authKey;
        localStorage.setItem('authKey', authKey);
        setAk(authKey);
        console.log(authKey)

      })
      .catch(err => {
        if(username === "" || password === "") {
          toast.error("Please Enter Credentials");
        }else if(err.response.data.message === "Incorrect Password...!"){
          toast.error("Incorrect Password...!");
        }else {
          toast.error("User Not Found!, Please Sign In");
        } 
        setUsername("");
        setPassword("");
      })
  }
  
  return (
    <>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 SignIn'>
              <div className='SignInBg'>
                <h3>Log In</h3>
                <input
                  className='form-control mt-4'
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value)
                  }}
                />
                <input
                  className='form-control mt-3'
                  type='Password'
                  placeholder='Password'
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                />
                <Link to='/SignIn'>
                  <button className='btn btn-primary mt-3 me-3'>Sign In</button>
                </Link>
                {/* <a href='SignIn'>
                  <button className='btn btn-primary mt-3 me-3'>Sign In</button>
                </a> */}
                <button className='btn btn-primary mt-3' onClick={sendLoginCr}>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
   
    </>
  )
}

export default LoginPage
