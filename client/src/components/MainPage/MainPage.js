import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsRequest, searchPostsRequest, getPosts } from '../../redux/postsReducer';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import MiniPost from '../MiniPost/MiniPost';

function MainPage() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      dispatch(searchPostsRequest(searchQuery));
    } else {
      dispatch(loadPostsRequest()); // Reset to all posts if search is cleared
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutRequest());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="container">
      <h1>Posts</h1>
      <Link to="/add-post">
        <Button variant="secondary" className="mb-4">
          Add Post
        </Button>
      </Link>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="primary" className="mt-2">
          Search
        </Button>
      </Form>
      {posts && posts.length > 0 ? (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4" key={post._id}>
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
