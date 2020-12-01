import { useEffect } from 'react';
import Header from './TopHeader/Header.js';
import './App.css';
import Sidebar from './LeftSidebar/Sidebar.js';
import Feed from './MiddlePost/Feed.js';
import Widgets from './RightFrame/Widgets.js';
import Login from './AppLogin/Login.js';
import { useStateValue } from './StateProvider.js';
import { auth } from './firebase.js';
import { actionTypes } from './reducer.js';

function App() {
  const [{ user }, dispatch] = useStateValue();

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       if (!user) {
  //         setChange(authUser.uid);
  //       }
  //       console.log('The user is still active', user);
  //     } else {
  //       console.log('The user is not active');
  //     }
  //   });
  // });
  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div>
          <Header />
          <div className='app__body'>
            <Sidebar />
            <Feed />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
