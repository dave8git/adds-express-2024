import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostRequest, getPostsById, loadPostsRequest, getLoggedUser } from '../../redux/postsReducer';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

function FullPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => getPostsById(state, id));
  const loggedUser = useSelector((state) => getLoggedUser(state));

  console.log('loggedUser', loggedUser, post);

  useEffect(() => {
    if (!post) {
      dispatch(loadPostsRequest(id));
    }
  }, [dispatch, id, post]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePostRequest(id));
      navigate('/');
    } catch (error) {
      alert('Failed to delete the post. Please try again.');
    }
  }

  const handleMainPage = async () => {
    navigate('/');
  }

  return post ? (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            {post.image && (
              <Card.Img
                variant="top"
                src={`http://localhost:8000/public/${post.image}`}
                alt={post.title}
              />
            )}
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
              <Card.Text>
                <strong>Price:</strong> {post.price}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {post.location}
              </Card.Text>
              <Card.Text>
                <strong>Seller:</strong> {post.seller}
              </Card.Text>
              {/* Add edit buttons here if needed */}
              { loggedUser && loggedUser.id === post.author?._id && (
                <>
                  <Link to={`/edit-post/${post._id}`}>
                    <Button variant="secondary" className="mr-2">Edit Post</Button>
                  </Link>
                  <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
                </>
              )
              }

              <Button variant="info" onClick={handleMainPage}>Main Page</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container className="mt-4 text-center">
      <Spinner animation="border" variant="primary" />
      <p>Loading...</p>
    </Container>
  );
}

export default FullPost;