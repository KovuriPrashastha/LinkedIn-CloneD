import React from 'react';
import './Header.css';
import { useStateValue } from '../StateProvider.js';
import logo from '../images/logo.png';
import {
  Add,
  Search,
  Home,
  Forum,
  NotificationsActive,
  ExpandMore,
  People,
  LocalMall,
  QuestionAnswer,
  Notifications,
} from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';

function Header() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className='header'>
      <div className='header__left'>
        <img src={logo} alt='' />
      </div>
      <div className='header__input'>
        <Search />
        <input type='text' placeholder='Search' />
      </div>
      <div className='header__center'>
        <div className='header__option header__option--active'>
          <Home fontSize='large' onClick={() => console.log('Helooooo')} />
        </div>
        <div className='header__option header__option--active'>
          <People fontSize='large' />
        </div>
        <div className='header__option header__option--active'>
          <LocalMall fontSize='large' />
        </div>
        <div className='header__option header__option--active'>
          <QuestionAnswer fontSize='large' />
        </div>
        <div className='header__option header__option--active'>
          <Notifications fontSize='large' />
        </div>
      </div>
      <div className='header__right'>
        <div className='header__info'>
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        <IconButton>
          <Add style={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton>
          <Forum style={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton>
          <NotificationsActive style={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton>
          <ExpandMore style={{ color: '#ffffff' }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
