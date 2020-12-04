import React, { useState, useEffect } from 'react';
import './Post.css';
import db from '../firebase.js';
import Comments from './Comment.js';
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
} from '@material-ui/core';
import {
  ThumbUp,
  NearMe,
  Comment,
  KeyboardArrowDown,
} from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider.js';

function Post({
  profilePic,
  image,
  username,
  timestamp,
  message,
  postId,
  likes,
  likedUsers,
}) {
  const [count, setCount] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const postComment = (event) => {
    event.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: firebase.auth().currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
    setCommentsOpen(true);
  };

  useEffect(() => {
    likedUsers.map((arrayElement) => {
      console.log(arrayElement);
      if (arrayElement === firebase.auth().currentUser.uid) {
        setCount(true);
        console.log(count);
      }
    });
  }, []);

  const sharePost = (e) => {
    // console.log(db.collection('posts').doc(postId));
    // console.log('Helloooo');
    var docRef = db.collection('posts').doc(postId);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          db.collection('posts').add({
            message: doc.data().message,
            timestamp: new Date(),
            profilePic: user.photoURL,
            image: doc.data().image,
            username: user.displayName,
            likes: 0,
            likedUsers: [],
            //postedBy: doc.data().postedBy,
          });
          console.log('Document data:', doc.data().message);
          console.log(doc.data().message);
          console.log(doc.data().image);
          console.log(doc.data().postedBy);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
    // db.collection('posts').add({
    //   message: input,
    //   timestamp: new Date(),
    //   profilePic: user.photoURL,
    //   image: imageUrl,
    //   username: user.displayName,
    //   likes: 0,
    //   likedUsers: [],
    //   postedBy: postAs,
    // });
    setOpen(true);
  };

  const postLike = (e) => {
    console.log(likes);
    setCount(true);
    e.preventDefault();
    db.collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.increment(1),
        likedUsers: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.uid
        ),
      });
  };

  const postDislike = (e) => {
    e.preventDefault();
    setCount(false);
    db.collection('posts')
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.increment(-1),
        likedUsers: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser.uid
        ),
      });
  };
  //const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div className='post'>
      <div className='post__top'>
        <Avatar src={profilePic} className='post__avatar' />
        <div className='post__topInfo'>
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <Divider />
      <div className='post__bottom'>
        <p>{message}</p>
      </div>
      <div className='post__image'>
        <img src={image} alt='' 
        width='600'
        height='300'
        />
      </div>
      <div className='post__options'>
        <div className='post__option'>
          {count ? (
            <ThumbUp
              style={{ color: '#0e76a8' }}
              type='submit'
              onClick={postDislike}
            />
          ) : (
            <ThumbUp
              style={{ color: 'grey' }}
              type='submit'
              onClick={postLike}
            />
          )}
          <Typography style={{ marginLeft: 10 }}>{likes}</Typography>
        </div>
        <form className='add_comment'>
          <TextField
            className='form___field'
            id='standard-basic'
            label='Add a comment'
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            startIcon={<Comment />}
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Add
          </Button>
        </form>
        <div className='post__option'>
          {!commentsOpen ? (
            <Button
              className='comments_open'
              onClick={() => {
                setCommentsOpen(true);
              }}
              endIcon={<KeyboardArrowDown />}
            >
              Show Comments
            </Button>
          ) : (
            <Comments
              setCommentsOpen={setCommentsOpen}
              commentsOpen={commentsOpen}
              postId={postId}
            />
          )}
        </div>
        <div className='post__option'>
          <NearMe onClick={sharePost} />
          <p>Share</p>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              Shared The Post Successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default Post;
