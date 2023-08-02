import { csrfFetch } from "./csrf";
import { RECEIVE_CURRENT_USER } from "./session";
import { receiveErrors } from "./errors";

export const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const RECEIVE_PROFILE_USER = 'users/RECEIVE_PROFILE_USER'

const receiveUsers = (users, friendships) => ({
    type: RECEIVE_USERS,
    users,
    friendships
})

const receiveUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

const receiveProfileUser = (user, friendships) => ({
    type: RECEIVE_PROFILE_USER,
    user,
    friendships
})

export const getUsers = (state) => {
    if (state.entities.users) {
        return Object.values(state.entities);
    } else {
        return [];
    }
}

export const updateUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: user
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveProfileUser(data.user));
        return res;
    } else {
        dispatch(receiveErrors(data.user));
        return res;
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

export const fetchProfileUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveProfileUser(data.user, data.friendships));
        return res;
    }
}

export const fetchUsers = () => async (dispatch) => {
    const res = await csrfFetch('/api/users');
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUsers(data.users, data.friendships));
        
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
        case RECEIVE_PROFILE_USER:
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