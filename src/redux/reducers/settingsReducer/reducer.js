import types from './types';

const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ITEMS_PER_PAGE_SET:
            let itemsPerPage = parseInt(action.itemsPerPage)
            let newState = Object.assign({}, state);
            newState.itemsPerPage = itemsPerPage;
            return newState;
        default:
            return state;
    }
};

export default settingsReducer;