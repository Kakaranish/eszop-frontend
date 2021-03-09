import { combineReducers } from 'redux';
import cartReducer from './cartReducer/reducer';
import identityReducer from './identityReducer/reducer';
import notificationReducer from './notificationReducer/reducer';
import settingsReducer from './settingsReducer/reducer';

const rootReducer = combineReducers({
    identity: identityReducer,
    cart: cartReducer,
    settings: settingsReducer,
    notifications: notificationReducer
});

export default rootReducer;