import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { RECEIVE_CURRENT_USER } from "./session";
import { csrfFetch } from "./csrf";

const RECEIVE_USER = 'users/RECEIVE_USER';
const RECEIVE_USERS = 'users/RECEIVE_USERS';

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data.user))
        return res;
    }
}

const usersReducer = ( state = {}, action ) => {
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_USER:
        return {
            ...nextState,
            [action.userId]: action.user
        }
        case RECEIVE_USERS:
            return {
                ...nextState,
                ...action.users
            }
        default:
        return nextState;
    }
}

export default usersReducer;