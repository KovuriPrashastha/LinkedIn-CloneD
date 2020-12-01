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

function Story({ image, profileSrc, title, storyId }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('came in');
    setOpen(false);
  };

  // const popUpStory = () => {
  //   console.log('Hello');
  //   var docRef = db.collection('stories').doc(storyId);
  //   docRef.get().then(function (doc) {
  //     if (doc.exists) {
  //       console.log(doc.data());
  //     }
  //   });
  // };
  return (
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
          <DialogTitle id='responsive-dialog-title'>{'Story'}</DialogTitle>
          <DialogContent>
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
  );
}

export default Story;
