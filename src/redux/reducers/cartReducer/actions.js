import types from './types';

export const addOrUpdateCartItem = (cartItem) => ({
    type: types.CART_ADD_OR_UPDATE_ITEM, cartItem
});

export const removeItemFromCart = (cartItemId) => ({
    type: types.CART_REMOVE_ITEM, cartItemId
});

export const clearCart = () => ({
    type: types.CART_CLEAR
});