import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsRequest, getPosts } from './redux/postsReducer';
function App() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default App;
