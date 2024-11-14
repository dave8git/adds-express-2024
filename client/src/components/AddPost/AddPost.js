import React from 'react';
import { addPostRequest } from '../../redux/postsReducer';
import PostForm from '../PostForm/PostForm';

const AddPost = () => (
    <PostForm onSubmit={addPostRequest} />
);

export default AddPost;