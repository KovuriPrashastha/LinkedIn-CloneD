import React, { useState } from 'react';
import './CreatePost.css';
import { useStateValue } from '../StateProvider.js';
import db from '../firebase.js';
import { Avatar } from '@material-ui/core';
import {
  Videocam,
  Event,
  PhotoCamera,
  Assignment,
  PostAdd,
} from '@material-ui/icons';

function CreatePost() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = (e) => {
    console.log('heloo');
    e.preventDefault();
    db.collection('posts').add({
      message: input,
      timestamp: new Date(),
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
          <PostAdd />
          <input
            InputProps={<PostAdd />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='createPost__input'
            placeholder={`Start a post ,${user.displayName}`}
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
          <PhotoCamera style={{ color: '#33aada' }} />
          <h3>Photo</h3>
        </div>
        <div className='createPost__option'>
          <Videocam style={{ color: '#9896f2' }} />
          <h3>Video</h3>
        </div>
        <div className='createPost__option'>
          <Event style={{ color: '#c19191' }} />
          <h3>Event</h3>
        </div>
        <div className='createPost__option'>
          <Assignment style={{ color: '#ef7e37' }} />
          <h3>Write article</h3>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
