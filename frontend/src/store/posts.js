import { csrfFetch } from "./csrf";
import { receiveErrors } from "./errors";
import { RECEIVE_PROFILE_USER } from "./users";
import { RECEIVE_LIKE, REMOVE_LIKE } from "./likes"; 

export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
const REMOVE_POST = 'posts/REMOVE_POST';

const receivePosts = (posts, comments, likes) => ({
    type: RECEIVE_POSTS,
    posts,
    comments,
    likes
});

const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
});

export const getPost = (postId) => (state) => {
    if (state.entities.posts && state.entities.posts[postId]) {
        return state.entities.posts[postId];
    } else {
        return null;
    }
};

export const fetchPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePosts(data.posts, data.comments, data.likes));
        // dispatch(receiveComments(data.comments, data.likes))
        return res;
    }
};

export const fetchPost = (post) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${post.id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePost(data.post));
        return res;
    }
};

export const updatePost = (post) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        body: post
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
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        body: post
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
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removePost(postId));
        return res;
    }
};

const postsReducer = ( state = {}, action ) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_PROFILE_USER:
            return {
                ...nextState,
                ...action.posts
            }
        case RECEIVE_POST:
            return {
                ...nextState,
                [action.post.id]: action.post
            };
        case RECEIVE_POSTS:
            return {
                ...nextState,
                ...action.posts
            };
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        case RECEIVE_LIKE:
            if (action.like.likeableType === "Post") {
                const likes = state[action.like.likeableId].likes || []
                return {
                    ...nextState,
                    [action.like.likeableId]: {
                        ...state[action.like.likeableId],
                        likes: [
                            ...likes,
                            action.like.id
                        ]
                    },  
                }
            };
        case REMOVE_LIKE:
            // debugger
            if (action.like.likeableType === "Post") {
                return {
                    ...nextState,
                    [action.like.likeableId]: {
                        ...nextState[action.like.likeableId],
                        likes: [
                            ...nextState[action.like.likeableId].likes.filter((id) => {
                                return (action.like.id !== id)
                            })
                        ]
                    },  
                };
            };
        default:
            return state;
    };
};

export default postsReducer;