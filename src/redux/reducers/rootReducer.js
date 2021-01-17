import { combineReducers } from 'redux';
import identityReducer from './identityReducer/reducer';

const rootReducer = combineReducers({
    identity: identityReducer
});

export default rootReducer;