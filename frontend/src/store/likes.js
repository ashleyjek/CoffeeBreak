import { RECEIVE_POSTS } from "./posts";
import { csrfFetch } from "./csrf";

export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE';
export const REMOVE_LIKE = 'likes/REMOVE_LIKE';

const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
});

const removeLike = (like) => ({
    type: REMOVE_LIKE, 
    like
});

export const createLike = (like) => async (dispatch) => {
    const { likeableType, likeableId } = like
    const res = await csrfFetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({
            like: {
                likeableType,
                likeableId
            }
        })
    });
    const data = await res.json();
    debugger
    if (res.ok) {
        dispatch(receiveLike(data.like));
        return res;
    }
};

 export const deleteLike = (like) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${like.id}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeLike(like));
        return res;
    }
};

const likesReducer = (initialState = {}, action) => {
    Object.freeze(initialState);
    const nextState = {...initialState}
    switch (action.type) {
        case RECEIVE_LIKE:
            return {
                [action.like.likerId]: action.like
            }
        case REMOVE_LIKE:
            delete nextState[action.like.id];
            return nextState;
        case RECEIVE_POSTS:
            return {
                ...nextState,
                ...action.likes
            }
        default:
            return initialState;
    };
};

export default likesReducer;