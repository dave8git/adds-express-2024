// Component for displaying mini posts on the website 
// Here you can find read more button which will take You to the full Post/Ad with edit buttons

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MiniPost({ post }) {
  console.log('post.id', post.id);
  return (
    <Card key={post.id} className="mb-4" style={{ maxWidth: '500px', margin: 'auto' }}>
      {post.image && (
        <Card.Img
          variant="top"
          src={`http://localhost:8000/public/${post.image}`}
          alt={post.title}
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <Link to={`/post/${post._id}`}>
          <Button variant="primary">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default MiniPost;
