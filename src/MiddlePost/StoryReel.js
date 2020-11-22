import React, { useState, useEffect } from 'react';
import './StoryReel.css';
import Story from './Story.js';
import { Add } from '@material-ui/icons';
import './Story.css';
import { IconButton } from '@material-ui/core';
import db from '../firebase.js';
import { useStateValue } from '../StateProvider.js';

export default function StoryReel(props) {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    db.collection('stories').onSnapshot((snapshot) =>
      setStories(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
  }, []);

  const [{ user }, dispatch] = useStateValue();

  const addStory = (e) => {
    e.preventDefault();
    db.collection('stories').add({
      title: user.displayName,
      profileSrc: user.photoURL,
      image: user.photoURL,
    });
  };
  return (
    <div className='storyreel_scroll'>
      <IconButton onClick={addStory}>
        <Add className='story' />
      </IconButton>
      <div className='storyReel'>
        {stories.map((story) => (
          <Story
            key={story.id}
            profileSrc={story.data.profileSrc}
            image={story.data.image}
            title={story.data.title}
          />
        ))}
      </div>
    </div>
  );
}
