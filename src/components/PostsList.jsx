import { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({isPosting, onStopPosting}) {
  

  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts(){
      setIsFetching(true);
      const response = await fetch('http://localhost:7001/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts.');
      }
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }

    fetchPosts().catch((error) => {
      console.error('Error fetching posts:', error);
    });
  }, []);

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

      {!isFetching && posts.length > 0 && (<ul className={classes.posts}>
        {posts.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            body={post.body}
          />
        ))}
      </ul>)}
      
      
      { posts.length === 0 && <div style={{textAlign: 'center', color: 'white'}}>No posts yet!</div> }

      {isFetching && <div style={{textAlign: 'center', color: 'white'}}>Loading posts...</div>}
    </>
  );
}

export default PostsList;
