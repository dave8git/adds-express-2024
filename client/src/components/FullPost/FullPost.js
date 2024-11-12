import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsById, loadPostsRequest } from '../../redux/postsReducer';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

function FullPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => getPostsById(state, id));

  useEffect(() => {
    if (!post) {
      dispatch(loadPostsRequest(id));
    }
  }, [dispatch, id, post]);

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
              <Button variant="secondary" className="mr-2">
                Edit Post
              </Button>
              <Button variant="danger">Delete Post</Button>
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