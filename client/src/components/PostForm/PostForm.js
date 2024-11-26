import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequest, updatePostRequest, getPostsById } from '../../redux/postsReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const PostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const post = useSelector((state) => getPostsById(state, id));

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        price: '',
        location: '',
        seller: '',
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log('Loaded post for editing:', post);
        if (post) {
            setFormData({
                title: post.title || '',
                content: post.content || '',
                price: post.price || '',
                location: post.location || '',
                seller: post.seller || '',
            });
        }
    }, [post]);
   
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = new FormData();
    //     data.append('title', formData.title);
    //     console.log('fdsfdsa');
    //     data.append('content', formData.content);
    //     data.append('price', formData.price);
    //     data.append('location', formData.location);
    //     data.append('seller', formData.seller);
    //     if (image) data.append('image', image);

    //     if (id) {
    //         console.log('updatePostRequest started', id, data);
    //         dispatch(updatePostRequest(id, data));
    //     } else {
    //         dispatch(addPostRequest(data));
    //     }
    //     navigate('/');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('seller', formData.seller);
    
        if (image) {
            data.append('image', image);
        }
    
        data.forEach((value, key) => {
            console.log(key, value); // Logs each form data key and its value
        });

        if (id) {
            console.log('updatePostRequest started', id, data);
            dispatch(updatePostRequest(id, data));
        } else {
            console.log('dispatch(addPostRequest');
            dispatch(addPostRequest(data));
        }
    
        navigate('/'); // Redirect after submission
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
                            {id ? 'Update Post' : 'Add Post'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PostForm;