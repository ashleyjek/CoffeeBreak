import { csrfFetch } from "./csrf";
import { receiveErrors } from "./errors";

const RECEIVE_POST = 'posts/RECEIVE_POST';
const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
const REMOVE_POST = 'posts/REMOVE_POST';

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
});

export const getPosts = (state) => {
    if (state.entities.posts) {
        return Object.values(state.entities.posts)
        // unSorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        // return unSorted;
    } else {
        return [];
    }
};

export const getPost = (postId) => (state) => {
    if (state.posts && state.entities.posts[postId]) {
        return state.posts[postId];
    } else {
        return null;
    }
};

export const fetchPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const posts = await res.json();
        dispatch(receivePosts(posts));
        return res;
    }
};

export const fetchPost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
        return res;
    }
};

export const updatePost = (post) => async (dispatch) => {
    const { id, body } = post;
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            id,
            body
        })
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receivePost(data.post));
        return res;
    } else {
        dispatch(receiveErrors(data.post));
        return res;
    }
}

export const createPost = (post) => async (dispatch) => {
    const { body } = post;
    const res = await csrfFetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post: {
                body
            }
        })
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receivePost(data.post));
        return res;
    } else {
        dispatch(receiveErrors(data.post));
        return res;
    }
};

export const deletePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`api/posts/${postId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removePost(postId));
        return res;
    }
};

const postsReducer = ( initialState = {}, action ) => {
    const nextState = {...initialState};
    switch (action.type) {
        case RECEIVE_POST:
            return {
                ...nextState,
                [action.post.id]: action.post
            }
        case RECEIVE_POSTS:
            return {
                ...nextState,
                ...action.posts
            }
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        default:
            return initialState;
    }
}

export default postsReducer;