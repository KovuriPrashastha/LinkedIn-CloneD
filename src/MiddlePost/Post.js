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
} from '@material-ui/core';
import {
  ThumbUp,
  NearMe,
  Comment,
  KeyboardArrowDown,
} from '@material-ui/icons';
import firebase from 'firebase';

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
        <img src={image} alt='' />
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

          {/* <ChatBubble /> 
          <p>Comment</p> */}
        </div>
        <div className='post__option'>
          <NearMe />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
