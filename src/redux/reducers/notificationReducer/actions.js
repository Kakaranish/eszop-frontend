import types from './types';

export const addNotification = notification => ({
    type: types.NOTIFICATION_ADD, notification
});

export const removeNotification = notificationId => ({
    type: types.NOTIFICATION_REMOVE, notificationId
});

export const setNotifications = notifications => ({
    type: types.NOTIFICATIONS_SET, notifications
});

export const clearNotifications = () => ({
    type: types.NOTIFICATION_CLEAR
});