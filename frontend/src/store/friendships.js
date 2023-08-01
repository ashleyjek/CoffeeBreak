import { csrfFetch } from "./csrf";
import { RECEIVE_USERS } from "./users";

export const ADD_FRIEND = 'friendships/RECEIVE_FRIEND';
export const REMOVE_FRIEND = 'frienships/REMOVE_FRIEND';

const addFriendship = (friendship, inverseFriendship) => ({
    type: ADD_FRIEND,
    friendship,
    inverseFriendship
})

const removeFriendship = (friendship, inverseFriendship) => ({
    type: REMOVE_FRIEND,
    friendship,
    inverseFriendship
})

export const createFriend = (friendId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friendships`, {
        method: 'POST',
        body: JSON.stringify(friendId)
});
    if (res.ok) {
        const data = await res.json();
        debugger
        dispatch(addFriendship(data.friendship, data.inverseFriendship));
        return res;
    }
};

export const removeFriend = (friendshipId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friendships/${friendshipId}`,{
        method: 'DELETE',
        body: JSON.stringify(friendshipId)
    });
        const data = await res.json();
        debugger
        dispatch(removeFriendship(data.friendship, data.inverseFriendship));
        return res;
}

const friendshipsReducer = ( initialState = {}, action) => {
    Object.freeze(initialState);
    const nextState = {...initialState};
    switch (action.type) {
        case ADD_FRIEND:
            debugger
            return {
                ...nextState,
                [action.friendship.id]: action.friendship,
                [action.inverseFriendship.id]: action.inverseFriendship
            };
        case RECEIVE_USERS:
            return {
                ...nextState,
                ...action.friendships
            }
        case REMOVE_FRIEND:
            debugger
            delete nextState[action.friendship.id];
            delete nextState[action.inverseFriendship.id];
            return nextState;
        default:
            return initialState;
    };
};

export default friendshipsReducer;

