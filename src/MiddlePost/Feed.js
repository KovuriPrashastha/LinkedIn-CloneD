import React, { useState, useEffect } from 'react';
import StoryReel from './StoryReel.js';
import CreatePost from './CreatePost.js';
import Post from './Post.js';
import db, { firebaseApp } from '../firebase.js';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [CUser, setCUser] = useState(null);

  useEffect(() => {
    console.log('no problem');
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  const authListener = () => {
    firebaseApp.auth().onAuthStateChanged((authUser) => {
      setCUser(authUser.displayName);
    });
  };
  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className='feed'>
      <StoryReel />
      <CreatePost />
      {posts.map((post) => (
        <Post
          key={post.id}
          CUser={CUser}
          postId={post.id}
          profilePic={post.data.profilePic}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
          message={post.data.message}
          likes={post.data.likes}
          likedUsers={post.data.likedUsers}
          postAs={post.data.postedBy}
        />
      ))}
    </div>
  );
}

export default Feed;
