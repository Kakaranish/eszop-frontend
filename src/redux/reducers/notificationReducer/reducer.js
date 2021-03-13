import types from './types';

const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case types.NOTIFICATION_ADD: {
            if (state.some(x => x.id === action.notification.id))
                return state;

            return [action.notification, ...state];
        }
        case types.NOTIFICATION_REMOVE: {
            return [...state].filter(x => x.id !== action.notificationId);
        }
        case types.NOTIFICATIONS_SET: {
            return action.notifications;
        }
        case types.NOTIFICATION_CLEAR: {
            return [];
        }
        default:
            return state;
    }
};

export default notificationReducer;