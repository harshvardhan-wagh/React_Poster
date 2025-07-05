import { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({isPosting, onStopPosting}) {
  

  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);

  function addPostHandler(postData) {
    fetch('http://localhost:7001/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    
     
    })

   setPosts((existingPosts) => [postData, ...existingPosts] );

  }
  return (
    <>
    {isPosting && ( 
      <Modal  onClose={onStopPosting}>
        <NewPost
          onCancel={onStopPosting} onAddPost={addPostHandler}
        />
      </Modal>)}
      
      <ul className={classes.posts}>
        {posts.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            body={post.body}
          />
        ))}
      </ul>
      { posts.length === 0 && <div style={{textAlign: 'center', color: 'white'}}>No posts yet!</div> }
    </>
  );
}

export default PostsList;
