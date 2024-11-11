import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsRequest, getPosts } from './redux/postsReducer';
import MiniPost from './components/MiniPost/MiniPost';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Posts</h1>
      {posts && posts.length > 0 ? (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <MiniPost post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default App;
