import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDMXBy81mZj44vjoFZb6BtvGIQp6NZJk20',
  authDomain: 'linkedin-clone-7c744.firebaseapp.com',
  databaseURL: 'https://linkedin-clone-7c744.firebaseio.com',
  projectId: 'linkedin-clone-7c744',
  storageBucket: 'linkedin-clone-7c744.appspot.com',
  messagingSenderId: '1006700551082',
  appId: '1:1006700551082:web:78869032502e33174de9d3',
  measurementId: 'G-QKFRMKHSQJ',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
//const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { firebaseApp, auth, provider };
export default db;
