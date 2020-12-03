import React, { useState, useEffect } from 'react';
import './StoryReel.css';
import Story from './Story.js';
import { Add, Close } from '@material-ui/icons';
import './Story.css';
import {
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import db, { storage } from '../firebase.js';
import { useStateValue } from '../StateProvider.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export default function StoryReel(props) {
  const [open, setOpen] = React.useState(false);
  const [stories, setStories] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [file, setFile] = useState(null);
  const [input, setInput] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('came in');
    setOpen(false);
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    db.collection('stories').onSnapshot((snapshot) =>
      setStories(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
  }, []);
  const handleUpload = () => {
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on('state_changed', console.log, console.error, () => {
      storage
        .ref('images')
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          db.collection('stories').add({
            timestamp: new Date(),
            profileSrc: user.photoURL,
            image: url,
            username: user.displayName,
            title: input,
          });
          setFile(null);
        });
    });
    setFile(null);
    setInput('');
    handleClose();
    setOpenAlert(true);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div className='storyreel_scroll'>
      <div classname='add__story'>
        <IconButton
          onClick={handleClickOpen}
          onClose={handleClose}
          classname='add__story'
          style={{ 'padding-top': '100px' }}
        >
          <Add />
        </IconButton>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby='responsive-dialog-title'
        >
          <DialogTitle id='responsive-dialog-title'>
            {'Add your story'}
          </DialogTitle>
          <DialogContent>
            <TextField
              onChange={(e) => setInput(e.target.value)}
              label='Enter Caption'
            />
          </DialogContent>
          <DialogActions>
            <Close fontSize='large' onClick={handleClose} className='icons' />
            <TextField
              style={{ 'padding-top': '24px' }}
              type='file'
              onChange={handleChange}
            />
            <Button onClick={handleUpload}>Add</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity='success'>
            Added To Stories!
          </Alert>
        </Snackbar>
      </div>
      <div className='storyReel'>
        {stories.map((story) => (
          <Story
            key={story.id}
            profileSrc={story.data.profileSrc}
            storyId={story.id}
            image={story.data.image}
            title={story.data.title}
            owner={story.data.username}
          />
        ))}
      </div>
    </div>
  );
}
