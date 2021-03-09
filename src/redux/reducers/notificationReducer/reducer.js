import types from './types';

const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case types.NOTIFICATION_ADD: {
            return [...state, action.notification];
        }
        case types.NOTIFICATION_CLEAR: {
            return [];
        }
        default:
            return state;
    }
};

export default notificationReducer;