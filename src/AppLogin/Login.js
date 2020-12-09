import React from 'react';
import './Login.css';
import logo from '../images/logo.png';
import { auth, provider } from '../firebase.js';
import { useStateValue } from '../StateProvider.js';
import { actionTypes } from '../reducer.js';
import { Button, Paper, Avatar } from '@material-ui/core';
import l1 from '../images/l1.png';
import l3 from '../images/l3.png';

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
      {/* <div style={{ display: 'flex', 'justify-content': 'space-evenly' }}>
    
       
      </div> */}
      <div className='login__logo'>
        <img src={logo} alt='' className='logos' />
      </div>
      <center>
        <div>
          <img src={l1} alt='' className='ill' />
        </div>

        <Button
          type='submit'
          onClick={signIn}
          className='signupButton'
          style={{
            'text-transform': 'none',
            fontSize: '18px',
            'padding-left': '40px',
            'font-weight': 'bold',
          }}
        >
          Sign In with Google
        </Button>
        <div>
          <img className='ill' src={l3} alt='' />
        </div>
      </center>
      <Paper className='paper2'>
        {/* <center>
            <img src={logo2} alt='' className='logos' />
            </center> */}

        <h4 className='heading'>
          "To arm young brains with competitive technology and nurture
          <br />
          holistic development of the individuals for a better tomorrow."
        </h4>
      </Paper>
      <Paper className='paper1'>
        <h4 className='heading'>
          "Striving for a symbiosis of technological excellence and human
          <br />
          values."
        </h4>
      </Paper>
    </div>
  );
}

export default Login;
