import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsRequest, searchPostsRequest, getPosts, getUserRequest, logoutRequest } from '../../redux/postsReducer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import MiniPost from '../MiniPost/MiniPost';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(getPosts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(loadPostsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);
  
  const user = useSelector(state => state.posts.user);
  console.log('user', user);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Posts</h1>
        <div>
          <Link to="/register">
            <Button variant="outline-primary" className="me-2">
              Register
            </Button>
          </Link>
          {
            user ? (<Link to="/logout">
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Link>) : (<Link to="/login">
              <Button variant="outline-success">
                Login
              </Button>
            </Link>)


          }
        </div>
      </div>
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
