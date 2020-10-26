import React from 'react';
import './Header.css';
import logo from './images/logo.png';
import {
  Add,
  Search,
  Home,
  Subscriptions,
  Storefront,
  SupervisedUserCircle,
  Flag,
  Forum,
  NotificationsActive,
  ExpandMore,
} from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from './StateProvider.js';

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
          <Subscriptions fontSize='large' />
        </div>
        <div className='header__option header__option--active'>
          <Flag fontSize='large' />
        </div>
        <div className='header__option header__option--active'>
          <Storefront fontSize='large' />
        </div>
        <div className='header__option header__option--active'>
          <SupervisedUserCircle fontSize='large' />
        </div>
      </div>
      <div className='header__right'>
        <div className='header__info'>
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>
        <IconButton>
          <Add />
        </IconButton>
        <IconButton>
          <Forum />
        </IconButton>
        <IconButton>
          <NotificationsActive />
        </IconButton>
        <IconButton>
          <ExpandMore />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
