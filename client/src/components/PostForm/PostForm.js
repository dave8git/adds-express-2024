import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPostRequest } from '../../redux/postsReducer';

const PostForm = () => {
    const dispatch = useDispatch();
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} />
            <textarea name="content" placeholder="Content" onChange={handleChange}></textarea>
            <input type="number" name="price" placeholder="Price" onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} />
            <input type="text" name="seller" placeholder="Seller" onChange={handleChange} />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Add Post</button>
        </form>
    );
};

export default PostForm;