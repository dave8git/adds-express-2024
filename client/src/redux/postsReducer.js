import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
export const getPostsById = ({ posts }, id) => posts.data.find(post => post._id === id);

/* ACTIONS */
// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const DELETE_POST = createActionName('DELETE_POST');
const LOAD_POSTS = createActionName('LOAD_POSTS');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const deletePost = payload => ({ payload, type: DELETE_POST });
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const updatePost = payload => ({ payload, type: UPDATE_POST });
export const addPost = payload => ({ payload, type: ADD_POST });

/* THUNKS */
export const loadPostsRequest = () => {
    return async dispatch => {

        dispatch(startRequest({ name: 'LOAD_POSTS' }));
        try {
            let res = await axios.get(`${API_URL}/posts`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(loadPosts(res.data));
            dispatch(endRequest({ name: 'LOAD_POSTS' }));
        } catch (e) {
            dispatch(errorRequest({ name: 'LOAD_POSTS', error: e.message }));
        }
    };
};

export const loadLocalPosts = () => {
    return async dispatch => {
        let res = await axios.get(`${API_URL}/posts`);
        dispatch(loadPosts(res.data));
    }
}
// dokończyć dalej wzorując się na pliku: // sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js

export const addPostRequest = (post) => {
    console.log('addPostRequest works');
    return async dispatch => {
        dispatch(startRequest({ name: 'ADD_POST' }));
        try {
            let res = await axios.post(`${API_URL}/posts`, post, {
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(addPost(res));
            dispatch(endRequest({ name: 'ADD_POST' }));
            dispatch(loadPostsRequest());
        } catch (error) {
            dispatch(errorRequest({ name: 'ADD_POST', error: error.response?.data?.message || 'An error occured' }));
        }
    };
};


export const deletePostRequest = (id) => {
    console.log('deleting post with id: ', id);
    return async (dispatch) => {
        dispatch(startRequest({ name: 'DELETE_POST' }));
        try {
            await axios.delete(`${API_URL}/posts/${id}`);
            dispatch(deletePost(id));
            console.log('deletePost action dispatched'); // Check if this logs
            dispatch(endRequest({ name: 'DELETE_POST' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'DELETE_POST', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

export const updatePostRequest = (id, updatedData) => {
    console.log('Updated Data Before Conversion:', updatedData);

    // Check if updatedData is FormData and convert to an object
    let dataToSend = updatedData;  // Default to using the updatedData directly

    if (updatedData instanceof FormData) {
        const formDataObject = {};
        updatedData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log('Converted FormData to Object:', formDataObject);
        dataToSend = formDataObject;  // Use the converted object
    }

    return async (dispatch) => {
        dispatch(startRequest({ name: 'UPDATE_POST' }));

        try {
            const response = await axios.put(`${API_URL}/posts/${id}`, dataToSend);
            dispatch(updatePost(response.data)); // Dispatch the updated post data to the reducer
            dispatch(endRequest({ name: 'UPDATE_POST' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'UPDATE_POST', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

/* INITIAL STATE */
const initialState = {
    data: [],
    requests: {}
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOAD_POSTS:
            console.log('!', action.payload);
            return { ...statePart, data: [...action.payload] };
        case ADD_POST:
            console.log('Adding post to state:', action.payload);
            return { ...statePart, data: [...statePart.data, action.payload] };
        case START_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false } } };
        case END_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: true } } };
        case ERROR_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false } } };
        case DELETE_POST:
            console.log('delete request works');
            return { ...statePart, data: statePart.data.filter(post => post._id !== action.payload) };
        case UPDATE_POST:
            console.log('Updated post:', action.payload.title);
            return {
                ...statePart,
                data: statePart.data.map(post => post._id === action.payload._id ? action.payload : post)
            };
        default:
            return statePart;
    }
}