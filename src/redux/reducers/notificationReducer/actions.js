import types from './types';

export const addNotification = notification => ({
    type: types.NOTIFICATION_ADD, notification
});

export const clearNotifications = () => ({
    type: types.NOTIFICATION_CLEAR
});