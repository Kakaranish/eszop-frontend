import types from './types';

const identityReducer = (state = null, action) => {
    switch (action.type) {
        case types.IDENTITY_SET:
            return {
                id: action.identity.id,
                email: action.identity.email,
                role: action.identity.role
            };
        case types.IDENTITY_UNSET:
            return null;
        default:
            return state;
    }
};

export default identityReducer;