import React from 'react';
import './Login.css';
import logo from './images/logo.png';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase.js';
import { useStateValue } from './StateProvider.js';
import { actionTypes } from './reducer.js';

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='login   '>
      <div className='login__logo'>
        <img src={logo} alt='' />
      </div>
      <Button type='submit' onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;
