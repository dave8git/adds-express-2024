import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js

/* SELECTORS */
export const getPosts = ({ posts }) => posts.data; 

/* ACTIONS */
// action name creator
const reducerName = 'posts'; 
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_POSTS = createActionName('LOAD_SEATS');
const ADD_POST = createActionName('ADD_SEAT');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const addSeat = payload => ({ payload, type: ADD_POST });

/* THUNKS */
export const loadPostsRequest = () => {
    return async dispatch => {

        dispatch(startRequest({ name: 'LOAD_POSTS'}));
        try {
            let res = await axios.get(`${API_URL}/posts`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            dispatch(loadPosts(res.data));
            dispatch(endRequest({ name: 'LOAD_POSTS' }));
        } catch(e) {
            dispatch(errorRequest({ name: 'LOAD_POSTS', error: e.message }));
        }
    };
};

export const loadLocalPosts = () => {
    console.log('loadlocalseats');
    return async dispatch => {
        let res = await axios.get( `${API_URL}/posts`);
        dispatch(loadPosts(res.data));
    }
}


// dokończyć dalej wzorując się na pliku: // sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js

