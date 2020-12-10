import React from 'react';
import './Story.css';
import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import db from '../firebase.js';

function Story({ image, profileSrc, title, storyId, owner, time }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteStory = (e) => {
    db.collection('stories').doc(storyId).delete();
  };
  const hours24 = () => {
    var d = Date.now();
    var dateInSecs = Math.round(d / 1000);
    var res = Math.abs(dateInSecs - time.seconds);
    var hours = res / 60 / 60;
    console.log(hours);
    if (hours <= 24) return true;
    else {
      DeleteStory();
      return false;
    }
  };
  return (
    <div>
      {hours24() ? (
        <div>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className='story'
            onClick={handleClickOpen}
            onClose={handleClose}
          >
            <Avatar className='story__avatar' src={profileSrc} />
            <h4>{title}</h4>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              disableBackdropClick
              disableEscapeKeyDown
              aria-labelledby='responsive-dialog-title'
            >
              <DialogTitle id='responsive-dialog-title' className='heading'>
                {owner}
              </DialogTitle>
              <DialogContent className='heading'>
                <DialogContentText>{title}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <CloseIcon
                  fontSize='large'
                  onClick={handleClose}
                  className='icons'
                />
                <img src={image} alt='' width='400px' height='400px' />
              </DialogActions>
            </Dialog>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Story;
