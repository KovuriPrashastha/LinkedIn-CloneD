import React, { useState, useEffect } from 'react';
import StoryReel from './StoryReel.js';
import CreatePost from './CreatePost.js';
import Post from './Post.js';
import db from '../firebase.js';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [studentPosts, setStudentPosts] = useState([]);
  const [teacherPosts, setTeacherPosts] = useState([]);

  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   db.collection('studentPosts')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) =>
  //       setStudentPosts(
  //         snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
  //       )
  //     );
  // }, []);
  useEffect(() => {
    console.log('no problem');
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  // posts = [].concat(posts, studentPosts);
  // console.log(posts);

  return (
    <div className='feed'>
      <StoryReel />
      <CreatePost />
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          profilePic={post.data.profilePic}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
          message={post.data.message}
          likes={post.data.likes}
          likedUsers={post.data.likedUsers}
        />
      ))}
      {/* <Post
        profilePic={myImg}
        message='Does this work'
        timestamp='some timestamp'
        username='Prash'
        image={defaultImf}
      />
      <Post
        profilePic={myImg}
        message='Does this work'
        timestamp='some timestamp'
        username='Prash'
        image={defaultImf}
      />
      <Post
        profilePic={myImg}
        message='Does this work'
        timestamp='some timestamp'
        username='Prash'
        image={defaultImf}
      />
      <Post
        profilePic={myImg}
        message='Does this work'
        timestamp='some timestamp'
        username='Prash'
        image={defaultImf}
      />
      <Post
        profilePic={myImg}
        message='Does this work'
        timestamp='some timestamp'
        username='Prash'
        image={defaultImf}
      /> */}
    </div>
  );
}

export default Feed;
