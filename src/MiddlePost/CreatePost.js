import React, { useState } from 'react';
import './CreatePost.css';
import { useStateValue } from '../StateProvider.js';
import db, { storage } from '../firebase.js';
import {
  Avatar,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Snackbar,
  TextField,
} from '@material-ui/core';
import {
  Videocam,
  Event,
  PhotoCamera,
  Assignment,
  PostAdd,
  Send,
} from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
function CreatePost() {
  const classes = useStyles();
  const [postAs, setPostAs] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    uploadTask.on('state_changed', console.log, console.error, () => {
      storage
        .ref('images')
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          db.collection('posts').add({
            message: input,
            timestamp: new Date(),
            profilePic: user.photoURL,
            image: url,
            username: user.displayName,
            likes: 0,
            likedUsers: [],
            postedBy: postAs,
          });
          setFile(null);
          setURL('');
          setInput('');
          setPostAs('');
          setOpenAlert(true);
        });
    });
  };
  const handleChangep = (event) => {
    setPostAs(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState('');

  return (
    <div className='createPost'>
      <div className='createPost__top'>
       <div style={{'display':"flex" , "justifyContent": "space-around"}}>
        <Avatar src={user.photoURL} />
       <input
            InputProps={<PostAdd />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='createPost__input'
            placeholder={`Start a post ,${user.displayName}`}
          />
          </div>
   <div style={{'display':"flex", "justifyContent": "space-between","paddingLeft":30}}>
          <TextField
            style={{ 'padding-top': '24px' }}
            type='file'
            onChange={handleChange}
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
              onChange={handleChangep}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Alumni'}>Alumni</MenuItem>
              <MenuItem value={'Teacher'}>Teacher</MenuItem>
              <MenuItem value={'Student'}>Student</MenuItem>
            </Select>
          </FormControl>
        <Button 
            style={{ 'margin': '24px' }}
        
        startIcon={<Send />} onClick={handleUpload} />
        </div>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity='success'>
            Posted Successfully!
          </Alert>
        </Snackbar>
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
