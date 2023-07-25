import { csrfFetch } from "./csrf";
import { RECEIVE_CURRENT_USER } from "./session";


// const RECEIVE_USER = 'users/RECEIVE_USER';

const receiveUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const fetchUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data.user));
        return res;
    }
    debugger
}

// const receiveUsers = (users) => ({
//     type: RECEIVE_USERS,
//     users
// })

const usersReducer = ( state = {}, action ) => {
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
        return {
            ...nextState,
            [action.user.id]: action.user
        }
        // case RECEIVE_USERS:
        //     return {
        //         ...nextState,
        //         ...action.users
        //     }
        default:
        return nextState;
    }
}

export default usersReducer;