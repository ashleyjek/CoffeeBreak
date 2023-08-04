import { csrfFetch } from "./csrf";
import { RECEIVE_USERS } from "./users";
import { RECEIVE_PROFILE_USER } from "./users";

export const ADD_FRIEND = 'friendships/RECEIVE_FRIEND';
export const REMOVE_FRIEND = 'friendships/REMOVE_FRIEND';

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
        dispatch(removeFriendship(data.friendship, data.inverseFriendship));
        return res;
}

const friendshipsReducer = ( initialState = {}, action) => {
    Object.freeze(initialState);
    const nextState = {...initialState};
    switch (action.type) {
        case ADD_FRIEND:
            return {
                ...nextState,
                [action.friendship.userId]: {
                    id: action.friendship.id,
                }
                // [action.inverseFriendship.userId]: {
                //     id: action.friendship.id
                // }
            };
        case RECEIVE_USERS:
            debugger
            return {
                ...nextState,
                ...action.friendships
            }
        case RECEIVE_PROFILE_USER:
            return {
                ...nextState,
                ...action.friendships
            }
        case REMOVE_FRIEND: 
            delete nextState[action.friendship.friendId];
            delete nextState[action.inverseFriendship.friendId];
            return nextState;
        default:
            return initialState;
    };
};

export default friendshipsReducer;

