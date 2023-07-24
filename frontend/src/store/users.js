import { RECEIVE_CURRENT_USER } from "./session";

// const RECEIVE_USERS = 'users/RECEIVE_USERS';

// const receiveUsers = (users) => ({
//     type: RECEIVE_USERS,
//     users
// })

const initialState = {
    [JSON.parse(sessionStorage.getItem('currentUser')).id]: JSON.parse(sessionStorage.getItem('currentUser'))
}
const usersReducer = ( state = initialState, action ) => {
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