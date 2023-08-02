import { csrfFetch } from "./csrf";
import { receiveErrors } from "./errors";

export const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

export const recieveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('currentUser');
    };
};

export const login = (user) => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.errors) throw data;
            storeCurrentUser(data.user);
            dispatch(recieveCurrentUser(data.user));
            return res;
        } 
    } catch (error) {
        throw error;
    }
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
};

export const signUp = (user) => async (dispatch) => {
        const { email, password, firstName, lastName, birthday, gender } = user
        const res = await csrfFetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email,
                    password,
                    firstName,
                    lastName,
                    birthday,
                    gender
                }
            })
        });
        const data = await res.json();
        if (res.ok) {
            storeCurrentUser(data.user);
            dispatch(recieveCurrentUser(data.user));
            return res;
        } else {
            dispatch(receiveErrors(data))
            return res;
        }
};


const initialState = {
    currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
}
const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, { currentUser: action.user});
        case REMOVE_CURRENT_USER:
            return { currentUser: null }

        default:
            return state;
    };
};

export default sessionReducer;