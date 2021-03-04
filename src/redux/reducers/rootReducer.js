import { combineReducers } from 'redux';
import identityReducer from './identityReducer/reducer';
import cartReducer from './cartReducer/reducer';
import settingsReducer from './settingsReducer/reducer';

const rootReducer = combineReducers({
    identity: identityReducer,
    cart: cartReducer,
    settings: settingsReducer
});

export default rootReducer;