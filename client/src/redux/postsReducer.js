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

const LOAD_POSTS = createActionName('LOAD_POSTS');
const ADD_POST = createActionName('ADD_POST');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
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
    console.log('loadlocalPosts');
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
            console.log('res', res);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(addPost(res));
            dispatch(endRequest({ name: 'ADD_POST' }));
            dispatch(loadPostsRequest());
        } catch (error) {
            console.log('error', error);
            dispatch(errorRequest({ name: 'ADD_POST', error: error.response?.data?.message || 'An error occured' }));
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
        default:
            return statePart;
    }
}