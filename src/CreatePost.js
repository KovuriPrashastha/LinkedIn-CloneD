import React, { useState } from 'react';
import './CreatePost.css';
import { Avatar } from '@material-ui/core';
import { Videocam, PhotoLibrary, InsertEmoticon } from '@material-ui/icons';
import { useStateValue } from './StateProvider.js';
import db from './firebase.js';
import firebase from './firebase.js';

function CreatePost() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = (e) => {
    console.log('heloo');
    e.preventDefault();
    db.collection('posts').add({
      message: input,
      timestamp: new Date(), //firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      image: imageUrl,
      username: user.displayName,
    });
    setInput('');
    setImageUrl('');
  };
  return (
    <div className='createPost'>
      <div className='createPost__top'>
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='createPost__input'
            placeholder={`Whats on your mind,${user.displayName}`}
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='url'
          />
        </form>
        <button onClick={handleSubmit} type='submit'>
          Hidden Button
        </button>
      </div>
      <div className='createPost__bottom'>
        <div className='createPost__option'>
          <Videocam style={{ color: 'red' }} />
          <h3>Live Video</h3>
        </div>
        <div className='createPost__option'>
          <PhotoLibrary style={{ color: 'green' }} />
          <h3>Photo/Video</h3>
        </div>
        <div className='createPost__option'>
          <InsertEmoticon style={{ color: 'orange' }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
