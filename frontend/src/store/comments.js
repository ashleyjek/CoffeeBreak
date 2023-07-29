import { csrfFetch } from "./csrf"
import { receiveErrors } from "./errors"
import { RECEIVE_POSTS } from "./posts";

const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
});

const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
});

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
});

// export const getComments = (state) => {
//     return state.entities.comments
// }

export const getComment = (commentId) => (state) => {
    if (state.entities.comments && state.entities.comments[commentId]) {
        return state.entities.comments[commentId];
    } else {
        return null;
    }
};

// export const fetchPostComments = (postId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/posts/${postId}`);
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(receiveComments(data.comments));
//         return res;
//     }
// }

export const fetchComments = () => async (dispatch) => {
    const res = await csrfFetch('/api/comments');
    if (res.ok) {
        const comments = await res.json();
        dispatch(receiveComments(comments));
        return res;
    }
};

export const fetchComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveComment(data.comment));
        return res;
    }
};

export const updateComment = (comment) => async (dispatch) => {
    debugger
    const { id, body, postId } = comment;
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            id, 
            body,
            postId
        })
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveComment(data.comment));
        return res;
    } else {
        dispatch(receiveErrors(data.comment));
        return res;
    }
};

export const createComment = (comment) => async (dispatch) => {
    debugger
    const { body, postId } = comment;
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            comment: {
                body,
                postId
            }
        })
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveComment(data.comment));
        return res;
    } else {
        dispatch(receiveErrors(data.comment));
        return res;
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeComment(commentId));
    }
};

const commentsReducer = ( state = {}, action ) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_COMMENT:
            debugger
            return {
                ...nextState,
                [action.comment.id]: action.comment
            }
        case RECEIVE_POSTS:
            return {
                ...nextState,
                ...action.comments
            };
        case RECEIVE_COMMENTS:
            return {
                ...nextState,
                ...action.comments
            };
        case REMOVE_COMMENT:
            delete nextState[action.commentId];
            return nextState;
        default: 
            return state;
    };
};

export default commentsReducer;
