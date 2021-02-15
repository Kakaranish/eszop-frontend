import types from './types';

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case types.CART_ADD_OR_UPDATE_ITEM: {
            state[action.cartItem.id] = action.cartItem;
            return Object.assign({}, state)
        }
        case types.CART_REMOVE_ITEM: {
            delete state[action.cartItemId];
            return Object.assign({}, state);
        }
        case types.CART_CLEAR: {
            return {};
        }
        default:
            return state;
    }
};

export default cartReducer;