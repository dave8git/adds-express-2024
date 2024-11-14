import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostsById, updatePostRequest, addPostRequest } from '../../redux/postsReducer';
import PostForm from '../PostForm/PostForm';

const EditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(state => getPostsById(state, id));

    const handleSubmit = (data) => {
        dispatch(updatePostRequest(id, data));
        navigate('/');
    };

    const handleSubmitNew = (data) =>  {
        dispatch(addPostRequest(id, data));
        navigate('/');
    }

    return <PostForm post={post} onSubmit={post ? handleSubmit : handleSubmitNew} />;
};

export default EditPost;