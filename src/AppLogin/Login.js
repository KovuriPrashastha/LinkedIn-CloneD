import React from 'react';
import './Login.css';
import logo1 from '../images/vision.jpg';
import logo2 from '../images/mission.jpg';
import logo from '../images/logo.png';
import { auth, provider } from '../firebase.js';
import { useStateValue } from '../StateProvider.js';
import { actionTypes } from '../reducer.js';
import { Button, Paper } from '@material-ui/core';

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
      <div style={{ display: 'flex', 'justify-content': 'space-evenly' }}>
        <Paper className='paper1'>
          <u>
            <img src={logo1} alt='' className='logos' />
          </u>
          <h4 className='heading'>
            "Striving for a symbiosis of technological excellence and human
            <br />
            values."
          </h4>
        </Paper>
        <Paper className='paper2'>
          <u>
            <img src={logo2} alt='' className='logos' />
          </u>
          <h4 className='heading'>
            "To arm young brains with competitive technology and nurture
            <br />
            holistic development of the individuals for a better tomorrow."
          </h4>
        </Paper>
      </div>
      <div className='login__logo'>
        <img src={logo} alt='' className='logos' />
      </div>
      <Button type='submit' onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;
