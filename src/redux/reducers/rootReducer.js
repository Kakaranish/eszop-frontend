import { combineReducers } from 'redux';
import identityReducer from './identityReducer/reducer';
import cartReducer from './cartReducer/reducer';

const rootReducer = combineReducers({
    identity: identityReducer,
    cart: cartReducer
});

export default rootReducer;