const OPEN_MODAL = 'ui/OPEN_MODAL';
const CLOSE_MODAL = 'ui/CLOSE_MODAL';

export const openModal = (modal, post) => ({
    type: OPEN_MODAL,
    modal: {
        modal: modal,
        post: post
    }
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

const initialState = {
    modal: null
};

const uiReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case OPEN_MODAL:
            return action.modal;
        case CLOSE_MODAL:
            return {
                modal: null
            }
        default:
            return state;
    }
};
export default uiReducer;