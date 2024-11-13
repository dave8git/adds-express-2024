import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPostRequest } from '../../redux/postsReducer';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const PostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        price: '',
        location: '',
        seller: '',
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('seller', formData.seller);
        if (image) data.append('image', image);

        dispatch(addPostRequest(data));
        navigate('/');
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="title" 
                                placeholder="Title" 
                                value={formData.title} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name="content" 
                                placeholder="Content" 
                                value={formData.content} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="price" 
                                placeholder="Price" 
                                value={formData.price} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="location" 
                                placeholder="Location" 
                                value={formData.location} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="seller">
                            <Form.Label>Seller</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="seller" 
                                placeholder="Seller" 
                                value={formData.seller} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                onChange={handleImageChange} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Post
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PostForm;