import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsRequest, getPosts } from '../../redux/postsReducer'; //'./redux/postsReducer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MiniPost from '../MiniPost/MiniPost';

function MainPage() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Posts</h1> 
      <Link to="/add-post">
        <Button variant="secondary" className="mb-4">
            Add Post
        </Button>
      </Link>
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

export default MainPage;