import React from 'react';
import SidebarRow from './SidebarRow.js';
import './Sidebar.css';
import './SidebarRow.css';
import { useStateValue } from '../StateProvider.js';
import { Avatar } from '@material-ui/core';
import {
  Info,
  Pages,
  People,
  Message,
  Storefront,
  Theaters,
} from '@material-ui/icons';

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className='sidebar'>
      <div className='SidebarRow'>
        <Avatar src={user.photoURL} />
        <h4>{user.displayName}</h4>
      </div>
      <SidebarRow title='Info' Icon={<Info />} />
      <SidebarRow title='Pages' Icon={<Pages />} />
      <SidebarRow title='Friends' Icon={<People />} />
      <SidebarRow title='Messenger' Icon={<Message />} />
      <SidebarRow title='Marketplace' Icon={<Storefront />} />
      <SidebarRow title='Videos' Icon={<Theaters />} />
    </div>
  );
}

export default Sidebar;
