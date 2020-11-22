import React, { useState } from 'react';
import './CreatePost.css';
import { useStateValue } from '../StateProvider.js';
import db from '../firebase.js';
import {
  Avatar,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import {
  Videocam,
  Event,
  PhotoCamera,
  Assignment,
  PostAdd,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function CreatePost() {
  const classes = useStyles();
  const [postAs, setPostAs] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setPostAs(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
      likes: 0,
      likedUsers: [],
      postedBy: postAs,
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
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open-select-label'>
              Post As
            </InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={postAs}
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Alumni'}>Alumni</MenuItem>
              <MenuItem value={'Teacher'}>Teacher</MenuItem>
              <MenuItem value={'Student'}>Student</MenuItem>
            </Select>
          </FormControl>
        </form>
        <button onClick={handleSubmit} type='submit'>
          Post
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
