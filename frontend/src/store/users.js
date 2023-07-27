import { csrfFetch } from "./csrf";
import { RECEIVE_CURRENT_USER } from "./session";


export const RECEIVE_USERS = 'users/RECEIVE_USERS';

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const getUsers = (state) => {
    if (state.entities.users) {
        return Object.values(state.entities);
    } else {
        return [];
    }
}

export const fetchUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data.user));
        return res;
    }
}

export const fetchUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    if (res.ok) {
        const users = await res.json();
        dispatch(receiveUsers(users));
        return res;
    }
}

const usersReducer = ( state = {}, action ) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
        return {
            ...nextState,
            [action.user.id]: action.user
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