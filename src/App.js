import { useEffect } from 'react';
import Header from './Header.js';
import './App.css';
import Sidebar from './Sidebar.js';
import Feed from './Feed.js';
import Widgets from './Widgets.js';
import Login from './Login.js';
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
            <Widgets />
            {/* Widgets */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
